## Updated README.md

**Data-Bank: A Decentralized Document Storage System**

This project is a full-stack application built on the Algorand blockchain, providing a decentralized platform for storing and managing documents.

### Getting Started

**Prerequisites:**

* **Docker:** Ensure Docker is installed and running on your system.
* **Node.js and npm:** Install the latest versions of Node.js and npm.
* **Algorand SDK for Python:** Install the Algorand Python SDK.
* **Algorand Wallet:** Set up an Algorand wallet to interact with the blockchain.

**Setup:**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/data-bank.git
   cd data-bank
   ```

2. **Start the Development Server:**
   ```bash
   cd data-bank-frontend
   npm run dev
   ```

   This will start a development server, and you can access the application in your browser at `http://localhost:3000`.

### How to Use

1. **Connect Your Wallet:**
   Connect your Algorand wallet (e.g., Pera Wallet) to the application.
2. **Upload a Document:**
   * Click the "Upload" button.
   * Select a document from your device.
   * Provide a name for the document.
   * Click the "Mint" button to create an NFT representing the document.
3. **View Your Documents:**
   * The dashboard will display a list of your minted NFTs.
   * Click on an NFT to view its details and access the stored document.

### Technical Overview

The Data-Bank project consists of two main components:

1. **Backend API:**
   * Written in Python using the Algorand SDK.
   * Handles the minting of NFTs and storage of document metadata.
   * Interacts with the Algorand blockchain to create transactions and submit them to the network.

2. **Frontend Application:**
   * Built with React.
   * Provides a user-friendly interface for uploading, viewing, and managing documents.
   * Connects to the backend API to interact with the Algorand blockchain and mint NFTs.

### Contributing

We welcome contributions to the Data-Bank project. Feel free to submit issues, pull requests, or feature requests.

**Note:** To run the backend API, you'll need to set up an Algorand node and configure the API to interact with the network. Refer to the Algorand SDK documentation for detailed instructions.
