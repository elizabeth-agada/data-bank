# Algorand NFT Data Bank

A Django-based application for minting NFTs on the Algorand blockchain, enabling users to upload documents, mint them as NFTs, and retrieve their NFTs. This project leverages IPFS for document storage via Pinata, allowing users to securely manage their documents as NFTs.

## Features

- Upload documents to IPFS and mint NFTs on the Algorand blockchain.
- Retrieve all NFTs associated with a user's wallet address.
- Access detailed information about minted assets.

## Technologies Used

- Django
- Django REST Framework
- Algorand SDK
- IPFS (via Pinata)
- Docker (for containerization)

## Getting Started

### Prerequisites

- Python 3.13
- Django
- Algorand SDK
- Pipenv or virtualenv for dependency management
- Docker (optional, for containerization)

  1.  **Create a virtual environment and activate it:**

    bash

    Copy code

    `python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate``

2.  **Install dependencies:**

    Copy code

    `pip install -r requirements.txt`

3.  **Set up environment variables:** Create a `.env` file in the root of your project with the following variables:

    plaintext

    Copy code

    `WALLET_ADDRESS=<your_creator_wallet_address>
    PRIVATE_KEY=<your_creator_private_key>
    PINATA_API_KEY=<your_pinata_api_key>
    PINATA_SECRET_API_KEY=<your_pinata_secret_api_key>`

4.  **Run database migrations:**

    bash

    Copy code

    `python manage.py migrate`

5.  **Start the development server:**

    bash

    Copy code

    `python manage.py runserver`

API Endpoints
-------------

### 1\. Document Upload and NFT Minting

-   **Endpoint:** `/api/upload/`
-   **Method:** `POST`
-   **Request Body:**
    -   `document`: (File, required)
    -   `user_wallet_address`: (String, required)
-   **Response:** `transaction_id` (String)

### 2\. User NFTs Retrieval

-   **Endpoint:** `/api/user-nfts/`
-   **Method:** `GET`
-   **Query Parameters:**
    -   `wallet_address`: (String, required)
-   **Response:** `nfts` (Array)

### 3\. Asset Details Retrieval

-   **Endpoint:** `/api/asset-details/`
-   **Method:** `GET`
-   **Query Parameters:**
    -   `asset_id`: (Integer, required)
-   **Response:** `asset` (Object)

Error Handling
--------------

The API returns standardized error messages for bad requests and internal server errors.



Acknowledgements
----------------

-   Algorand SDK
-   Pinata for IPFS storage
-   Django REST Framework
