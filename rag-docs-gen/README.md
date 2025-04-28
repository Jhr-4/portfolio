# RAG System Document Embedding Management

This folder contains tools to manage the document embeddings for the RAG (Retrieval-Augmented Generation) system. The embedding generation process has been separated from the main application to simplify deployment and allow for better control over the embedding generation process.

## Setup

1. Make sure you have Node.js installed
2. Run `npm install` in this folder to install dependencies
3. Create a `.env` file with the following variables:
   ```
   ATLAS_API_KEY=your_nomic_atlas_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX_NAME=portfolio219-rag
   ```

## Available Commands

You can use the following npm scripts to manage the embeddings:

- **Check Status**: Check if the Pinecone index exists and has embeddings
  ```
  npm run status
  ```

- **Initialize Embeddings**: Delete existing embeddings and generate new ones
  ```
  npm run init
  ```

- **Generate Embeddings**: Generate embeddings without deleting existing ones
  ```
  npm run generate
  ```

- **Delete Embeddings**: Delete all embeddings from Pinecone
  ```
  npm run delete
  ```

## How It Works

The system reads JSON documents from `rag-docs-gen/docs`, processes them into chunks, generates embeddings using Nomic Atlas, and stores them in Pinecone. The application then queries these embeddings to provide context-aware responses.

If the application shows "Please contact administrator to create embeddings", it means you need to run the embedding generation script.

## Updating Documents

When you update the documents in `rag-docs-gen/docs`, you'll need to regenerate the embeddings for the changes to take effect:

1. Edit or add documents in `rag-docs-gen/docs`, and ensure to `cd /rag-docs-gen`
2. Run `npm run init` to regenerate all embeddings

## Troubleshooting

- **Missing API keys**: Ensure your `.env` file has the correct API keys
- **Connection errors**: Check your internet connection and Pinecone account status
- **Empty responses**: Verify that embeddings were successfully generated with `npm run status`

## Security Note

IMPORTANT: Never use the `NEXT_PUBLIC_` prefix for API keys in this project, as that would expose them to the client side. API keys should only be used server-side.