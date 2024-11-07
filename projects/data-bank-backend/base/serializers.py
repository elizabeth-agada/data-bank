# serializers.py
from rest_framework import serializers
from algosdk import account, encoding

class DocumentUploadSerializer(serializers.Serializer):
    document = serializers.FileField()
    document_name = serializers.CharField()
    user_wallet_address = serializers.CharField()

    def validate(self, data):
        if not data['user_wallet_address']:
            raise serializers.ValidationError("The user's wallet address is required.")
        user_wallet_address = data['user_wallet_address']
        if not data['document']:
            raise serializers.ValidationError("The document is required.")
        if not data['document_name']:
            raise serializers.ValidationError("The document name is required.")
        if encoding.is_valid_address(user_wallet_address):
            return data
        else:
            raise serializers.ValidationError("The address is invalid.")
