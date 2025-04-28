/**
 * Pinecone Query API
 * 
 * This endpoint handles querying the Pinecone index for similar documents.
 * - PUT /api/rag/pinecone/query - Search for similar documents
 */

import { NextRequest, NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import { NomicEmbeddings } from '@/lib/nomicEmbeddings';

// Initialize Pinecone client with server-side environment variables
const PINECONE_API_KEY = process.env.PINECONE_API_KEY || '';
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'portfolio219-rag';

// Initialize the Pinecone client
const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

/**
 * Query Pinecone for similar vectors
 * POST /api/rag/pinecone/query
 * Body: { query: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;
    
    // Input validation
    if (!query || typeof query !== 'string') {
      return NextResponse.json({
        success: false,
        message: "Query must be a non-empty string"
      }, { status: 400 });
    }
    
    // Limit query length to prevent abuse
    const sanitizedQuery = query.trim().slice(0, 1000);
    if (sanitizedQuery.length < 3) {
      return NextResponse.json({
        success: false,
        message: "Query must be at least 3 characters long"
      }, { status: 400 });
    }
    
    const nomicApiKey = process.env.ATLAS_API_KEY;
    if (!nomicApiKey) {
      console.error("Missing Nomic Atlas API key in server configuration");
      return NextResponse.json({
        success: false,
        message: "Server configuration error"
      }, { status: 500 });
    }
    
    // Check if index exists
    console.log('Checking if index exists:', PINECONE_INDEX_NAME);
    const indexList = await pinecone.listIndexes();
    const indexExists = indexList.indexes?.some(index => index.name === PINECONE_INDEX_NAME) || false;
    
    if (!indexExists) {
      console.log(`Index ${PINECONE_INDEX_NAME} does not exist`);
      return NextResponse.json({
        success: false,
        message: "Required resources not available"
      }, { status: 404 });
    }
    
    // Get embedding for query
    console.log('Generating embedding for query');
    const embeddings = new NomicEmbeddings(nomicApiKey);
    const queryEmbedding = await embeddings.embedQuery(sanitizedQuery);
    
    // Get index
    const index = pinecone.index(PINECONE_INDEX_NAME);
    
    // Query pinecone with timeout
    console.log('Querying Pinecone for similar vectors...');
    const queryPromise = index.query({
      vector: queryEmbedding,
      topK: 4,
      includeMetadata: true,
      includeValues: false
    });
    
    // Add a timeout to the query
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Query timed out')), 5000);
    });
    
    const results = await Promise.race([queryPromise, timeoutPromise]) as any;
    
    console.log(`Found ${results.matches.length} matches in Pinecone`);
    
    // Return matches with proper data validation
    return NextResponse.json({
      success: true,
      matches: results.matches.map((match: any) => ({
        id: match.id || '',
        score: typeof match.score === 'number' ? match.score : 0,
        content: match.metadata?.content || '',
        source: match.metadata?.source || 'Unknown',
        title: match.metadata?.title || 'Untitled'
      }))
    });
  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return NextResponse.json({
      success: false,
      error: "An error occurred while processing your request"
    }, { status: 500 });
  }
}