from algosdk import transaction, encoding
from algosdk.v2client import algod
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import DocumentUploadSerializer
from rest_framework import status
import requests
from django.conf import settings
from typing import Dict, Any
import base64
import logging

# Get the logger for the NFT project
logger = logging.getLogger('nft_project')

ALGOD_ADDRESS = "https://testnet-api.4160.nodely.dev"  # Using AlgoNode’s testnet
ALGOD_TOKEN = ""  # No API key required for public endpoints

# Replace these with actual values
CREATOR_ADDRESS = settings.WALLET_ADDRESS
CREATOR_PRIVATE_KEY =settings.PRIVATE_KEY
PINATA_API_KEY = settings.PINATA_API_KEY
PINATA_SECRET_API_KEY = settings.PINATA_SECRET_API_KEY

def mint_nft(user_wallet_address, document_name, ipfs_hash):
    # Initialize Algod client
    algod_client = algod.AlgodClient(algod_token=ALGOD_TOKEN, algod_address=ALGOD_ADDRESS)

    # Check address validity
    if not encoding.is_valid_address(CREATOR_ADDRESS):
        raise Exception("Invalid CREATOR_ADDRESS format.")
    if not encoding.is_valid_address(user_wallet_address):
        raise Exception("Invalid user_wallet_address format.")

    # Define transaction parameters
    params = algod_client.suggested_params()

    # Create an NFT (Asset) transaction
    txn = transaction.AssetConfigTxn(
        sender=CREATOR_ADDRESS,
        sp=params,
        default_frozen=False,
        unit_name="DOCNFT",
        asset_name=document_name,
        manager=CREATOR_ADDRESS,
        reserve=CREATOR_ADDRESS,
        freeze=CREATOR_ADDRESS,
        clawback=CREATOR_ADDRESS,
        url=f"https://ipfs.algonode.xyz/ipfs/{ipfs_hash}/",
        total=1,  # Total supply of 1 for NFTs
        decimals=0,
        metadata_hash=bytes(user_wallet_address, "utf-8")[:32],  # Hash of the user's wallet address
    )

    # Sign the transaction
    signed_txn = txn.sign(CREATOR_PRIVATE_KEY)

    try:
        # Send the transaction to the network
        txid = algod_client.send_transaction(signed_txn)
        print(f"Sent asset create transaction with txid: {txid}")
        
        # Wait for the transaction to be confirmed
        results = transaction.wait_for_confirmation(algod_client, txid, 4)
        print(f"Result confirmed in round: {results['confirmed-round']}")

        # Grab the asset ID for the asset we just created
        created_asset = results["asset-index"]
        print(f"Asset ID created: {created_asset}")

        return txid  # You can return both txid and asset ID if needed

    except Exception as e:
        logger.error(f"Minting NFT failed for {user_wallet_address} with IPFS hash {ipfs_hash}: {str(e)}")
        raise Exception(f"Transaction failed: {str(e)}")
def upload_to_pinata(document):
    try:
        url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
        headers = {
            "pinata_api_key": PINATA_API_KEY,
            "pinata_secret_api_key": PINATA_SECRET_API_KEY
        }
                
        files = {
            "file": document
        }
                
        response = requests.post(url, headers=headers, files=files)
                
        if response.status_code != 200:
            raise Exception("Failed to upload to Pinata: " + response.text)
        ipfs_hash = response.json()["IpfsHash"]
        return str(ipfs_hash)
    except Exception as e:
        logger.error(f"Uploading to Pinata failed for document: {str(e)}")
        return Response({"error": str(e)}, status=500)
class DocumentUploadView(APIView):
    def post(self, request):
        logger.info("Received document upload request.")
        serializer = DocumentUploadSerializer(data=request.data)
        if serializer.is_valid():
            document = serializer.validated_data['document']
            document_name = serializer.validated_data['document_name']
            user_wallet_address = serializer.validated_data['user_wallet_address']
            try:
                ipfs_hash = upload_to_pinata(document)
                ipfs_url = ipfs_hash
                print(f"Document uploaded to IPFS: {ipfs_url}")
                txid = mint_nft(user_wallet_address, document_name, ipfs_hash)
                logger.info(f"Document uploaded and NFT minted. Transaction ID: {txid}")
                return Response({'transaction_id': txid})
            except Exception as e:
                logger.error(f"Failed to upload document or mint NFT: {str(e)}")
                return Response({"error": str(e)}, status=500)
            
        return Response(serializer.errors, status=400)
    


def get_user_nfts(user_wallet_address):
    # Initialize Algod client
    algod_client = algod.AlgodClient(algod_token=ALGOD_TOKEN, algod_address=ALGOD_ADDRESS)
    
    # Prepare the metadata hash to look for (in bytes, truncated to 32 bytes)
    metadata_hash = bytes(user_wallet_address, "utf-8")[:32]

    # Fetch all assets created by the creator account
    account_info = algod_client.account_info(CREATOR_ADDRESS)
    created_assets = account_info.get("created-assets", [])
    
    # Filter assets based on metadata hash
    user_nfts = []
    for asset in created_assets:
        asset_info = algod_client.asset_info(asset['index'])
        
        # Retrieve and decode the asset's metadata hash from base64
        asset_metadata_hash_encoded = asset_info.get('params', {}).get('metadata-hash', '')
        if asset_metadata_hash_encoded:
            asset_metadata_hash = base64.b64decode(asset_metadata_hash_encoded)
            
            # Compare the metadata hashes
            if asset_metadata_hash == metadata_hash:
                user_nfts.append(asset_info)
    
    return user_nfts

class UserNFTsView(APIView):
    def get(self, request):
        user_wallet_address = request.query_params.get('wallet_address')
        
        if not user_wallet_address:
            return Response({"error": "Missing wallet address"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            nfts = get_user_nfts(user_wallet_address)
            return Response({'nfts': nfts})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def get_asset_details(asset_id: int):
    algod_client = algod.AlgodClient(algod_token=ALGOD_TOKEN, algod_address=ALGOD_ADDRESS)
    try:
        # Fetch asset information by asset ID
        asset_info = algod_client.asset_info(asset_id)
        
        # Extract the asset parameters
        asset_params: Dict[str, Any] = asset_info.get("params", {})
        
        # Construct response data
        asset_data = {
            "asset_name": asset_params.get("name", "No name available"),
            "params": asset_params
        }
        return asset_data
    
    except Exception as e:
        raise Exception(f"Error retrieving asset info: {str(e)}")
    
class AssetDetailsView(APIView):
    def get(self, request):
        asset_id = request.query_params.get("asset_id")
        
        if not asset_id:
            return Response({"error": "Asset ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            asset_id = int(asset_id)
            asset_data = get_asset_details(asset_id)
            return Response({"asset": asset_data}, status=status.HTTP_200_OK)
        
        except ValueError:
            return Response({"error": "Invalid Asset ID"}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)