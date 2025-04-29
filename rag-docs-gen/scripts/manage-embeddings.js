/**
 * RAG System Embeddings Management Script
 * 
 * This script provides commands to manage the RAG system embeddings:
 * - delete: Delete all embeddings from Pinecone
 * - generate: Generate new embeddings and upload them to Pinecone
 * - init: Delete + Generate (complete reset)
 * - status: Check the current status of embeddings
 * 
 * Usage:
 *   node manage-embeddings.js <command>
 * 
 * Example:
 *   node manage-embeddings.js init
 *   node manage-embeddings.js status
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pinecone } = require('@pinecone-database/pinecone');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');

// Configuration
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;
const NOMIC_API_KEY = process.env.ATLAS_API_KEY;
// Standardize on a single path for documents
const DOCS_PATH = path.join(process.cwd(), 'docs');

// Check required environment variables
if (!PINECONE_API_KEY) {
  console.error('Error: PINECONE_API_KEY environment variable is required');
  process.exit(1);
}

if (!PINECONE_INDEX_NAME) {
  console.error('Error: PINECONE_INDEX_NAME environment variable is required');
  process.exit(1);
}

if (!NOMIC_API_KEY) {
  console.error('Error: ATLAS_API_KEY environment variable is required');
  process.exit(1);
}

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

/**
 * Loads all RAG documents from the filesystem
 */
async function loadAllDocuments() {
  // Check if documents path exists
  if (!fs.existsSync(DOCS_PATH)) {
    throw new Error(`Document path ${DOCS_PATH} does not exist. Please create this directory and add JSON documents.`);
  }
  
  console.log(`Loading RAG documents from ${DOCS_PATH}...`);
  
  try {
    // Get list of JSON files
    const files = fs.readdirSync(DOCS_PATH)
      .filter(file => file.endsWith('.json'));
    
    if (files.length === 0) {
      throw new Error(`No JSON documents found in ${DOCS_PATH}. Please add documents.`);
    }
    
    console.log(`Found ${files.length} document files: ${files.join(', ')}`);
    
    // Load each document
    const documents = [];
    const documentSources = [];
    
    for (const file of files) {
      const filePath = path.join(DOCS_PATH, file);
      console.log(`Reading ${filePath}...`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      try {
        console.log(`Parsing JSON for ${file}...`);
        const docData = JSON.parse(fileContent);
        
        if (!docData.content) {
          console.warn(`Warning: ${file} does not have a 'content' field. Skipping.`);
          continue;
        }
        
        // Add to collections
        documents.push(docData.content);
        documentSources.push({
          id: docData.id || file.replace('.json', ''),
          title: docData.title || file.replace('.json', '')
        });
      } catch (parseError) {
        console.error(`Error parsing JSON in ${file}:`, parseError.message);
        console.error('Please check the file for JSON syntax errors.');
        continue;
      }
    }
    
    if (documents.length === 0) {
      throw new Error('No valid documents were loaded. Please check your JSON files.');
    }
    
    console.log(`Successfully loaded ${documents.length} documents`);
    return { documents, documentSources };
  } catch (error) {
    console.error('Error loading documents:', error);
    throw error;
  }
}

/**
 * Generates embeddings using the Nomic Atlas API
 */
async function generateEmbeddings(texts) {
  try {
    console.log(`Generating embeddings for ${texts.length} text chunks...`);
    
    const url = 'https://api-atlas.nomic.ai/v1/embedding/text';
    const batchSize = 100; // Process in reasonable batch sizes
    const allEmbeddings = [];
    
    // Process in batches
    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(texts.length/batchSize)}...`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${NOMIC_API_KEY}`
        },
        body: JSON.stringify({
          model: 'nomic-embed-text-v1.5',
          texts: batch
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nomic Atlas API error: ${response.status} ${errorText}`);
      }
      
      const result = await response.json();
      allEmbeddings.push(...result.embeddings);
    }
    
    return allEmbeddings;
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw error;
  }
}

/**
 * Checks the status of the Pinecone index
 */
async function checkStatus() {
  try {
    console.log('Checking Pinecone status...');
    
    // Check if index exists
    const indexList = await pinecone.listIndexes();
    const indexExists = indexList.indexes?.some(index => index.name === PINECONE_INDEX_NAME) || false;
    
    if (!indexExists) {
      console.log(`Index ${PINECONE_INDEX_NAME} does not exist`);
      return { exists: false, vectors: 0 };
    }
    
    // Get the index stats
    const index = pinecone.index(PINECONE_INDEX_NAME);
    const stats = await index.describeIndexStats();
    
    console.log(`Index ${PINECONE_INDEX_NAME} exists with ${stats.totalRecordCount || 0} vectors`);
    return { exists: true, vectors: stats.totalRecordCount || 0 };
  } catch (error) {
    console.error('Error checking Pinecone status:', error);
    throw error;
  }
}

/**
 * Deletes the Pinecone index
 */
async function deleteIndex() {
  try {
    console.log(`Attempting to delete index ${PINECONE_INDEX_NAME}...`);
    
    // Check if index exists first
    const indexList = await pinecone.listIndexes();
    const indexExists = indexList.indexes?.some(index => index.name === PINECONE_INDEX_NAME) || false;
    
    if (!indexExists) {
      console.log(`Index ${PINECONE_INDEX_NAME} doesn't exist, nothing to delete`);
      return true;
    }
    
    // Delete the index
    await pinecone.deleteIndex(PINECONE_INDEX_NAME);
    console.log(`Successfully deleted index ${PINECONE_INDEX_NAME}`);
    
    // Wait to ensure the deletion is processed
    console.log('Waiting for deletion to complete...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    return true;
  } catch (error) {
    console.error('Error deleting Pinecone index:', error);
    throw error;
  }
}

/**
 * Creates a new Pinecone index
 */
async function createIndex() {
  try {
    console.log(`Creating new index ${PINECONE_INDEX_NAME}...`);
    
    // Check if index already exists
    const indexList = await pinecone.listIndexes();
    const indexExists = indexList.indexes?.some(index => index.name === PINECONE_INDEX_NAME) || false;
    
    if (indexExists) {
      console.log(`Index ${PINECONE_INDEX_NAME} already exists`);
      return true;
    }
    
    // Create the index
    await pinecone.createIndex({
      name: PINECONE_INDEX_NAME,
      dimension: 768,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1'
        }
      }
    });
    
    // Wait for the index to be created and ready
    console.log('Waiting for index to be ready...');
    await new Promise(resolve => setTimeout(resolve, 20000));
    
    console.log(`Successfully created index ${PINECONE_INDEX_NAME}`);
    return true;
  } catch (error) {
    console.error('Error creating Pinecone index:', error);
    throw error;
  }
}

/**
 * Generate and upload embeddings to Pinecone
 */
async function generateAndUploadEmbeddings() {
  try {
    // Load all documents
    const { documents, documentSources } = await loadAllDocuments();
    
    // Create text splitter
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    
    // Process documents into chunks
    console.log('Processing documents into chunks...');
    const docs = [];
    const rawTextChunks = [];
    
    for (let i = 0; i < documents.length; i++) {
      const docContent = documents[i];
      const docMetadata = documentSources[i];
      
      // Split text into chunks
      const chunks = await textSplitter.splitText(docContent);
      
      // Add each chunk with metadata
      chunks.forEach((chunk, chunkIndex) => {
        docs.push({
          pageContent: chunk,
          metadata: {
            source: docMetadata.id,
            title: docMetadata.title,
            chunkIndex
          }
        });
        rawTextChunks.push(chunk);
      });
    }
    
    // Generate embeddings for all chunks
    const embeddings = await generateEmbeddings(rawTextChunks);
    
    // Create or ensure the index exists
    await createIndex();
    
    // Get the index
    const index = pinecone.index(PINECONE_INDEX_NAME);
    
    // Upload vectors in batches
    const batchSize = 100;
    console.log('Uploading vectors to Pinecone...');
    
    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = docs.slice(i, i + batchSize);
      const batchEmbeddings = embeddings.slice(i, i + batchSize);
      
      const vectors = batch.map((doc, idx) => ({
        id: `${doc.metadata.source}-chunk-${doc.metadata.chunkIndex}`,
        values: batchEmbeddings[idx],
        metadata: {
          content: doc.pageContent,
          source: doc.metadata.source,
          title: doc.metadata.title
        }
      }));
      
      await index.upsert(vectors);
      console.log(`Uploaded batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(docs.length/batchSize)} to Pinecone`);
    }
    
    console.log(`Successfully uploaded ${docs.length} vectors to Pinecone`);
    return true;
  } catch (error) {
    console.error('Error generating and uploading embeddings:', error);
    throw error;
  }
}

/**
 * Main function to handle commands
 */
async function main() {
  const command = process.argv[2]?.toLowerCase() || 'status';
  
  try {
    switch (command) {
      case 'status':
        await checkStatus();
        break;
        
      case 'delete':
        await deleteIndex();
        break;
        
      case 'generate':
        await generateAndUploadEmbeddings();
        // Add a delay before checking status to ensure Pinecone has time to process
        console.log('Waiting for Pinecone to process vectors...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        await checkStatus();
        break;
        
      case 'init':
        console.log('Performing complete initialization (delete + generate)...');
        await deleteIndex();
        await generateAndUploadEmbeddings();
        // Add a delay before checking status to ensure Pinecone has time to process
        console.log('Waiting for Pinecone to process vectors...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        await checkStatus();
        break;
        
      case 'test':
        // New test command to directly query Pinecone
        console.log('Testing direct Pinecone connection...');
        
        // Get the index
        console.log('Getting direct connection to the index...');
        const index = pinecone.index(PINECONE_INDEX_NAME);
        
        // Query with a simple vector (all zeros)
        const testVector = Array(768).fill(0);
        console.log('Sending test query to Pinecone...');
        const testResults = await index.query({
          vector: testVector,
          topK: 10,
          includeMetadata: true
        });
        
        console.log('Direct Pinecone query results:');
        console.log(`Found ${testResults.matches.length} matches`);
        console.log('First few matches:', testResults.matches.slice(0, 3));
        break;
        
      default:
        console.log(`
Unknown command: ${command}

Available commands:
  status   - Check the current status of embeddings
  delete   - Delete all embeddings from Pinecone
  generate - Generate new embeddings and upload them to Pinecone
  init     - Delete + Generate (complete reset)
  test     - Test direct connection to Pinecone with a query
`);
        process.exit(1);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Command failed:', error);
    process.exit(1);
  }
}

// Run the main function
main();