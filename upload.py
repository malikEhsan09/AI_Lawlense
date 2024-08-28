from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF for PDF handling
import os
import openai
from supabase import create_client, Client
from langchain_community.vectorstores import SupabaseVectorStore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings import OpenAIEmbeddings
from dotenv import load_dotenv

from langchain_openai import OpenAIEmbeddings

# Initialize the FastAPI app
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    # Make sure this matches your frontend URL
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Load environment variables from .env file
load_dotenv()
openai.api_key = os.environ['OPENAI_API_KEY']
supabase_url = os.environ['SUPABASE_URL']
supabase_key = os.environ['SUPABASE_SERVICE_KEY']
supabase: Client = create_client(supabase_url, supabase_key)


# Function to extract text from a PDF
def extract_text_from_pdf(file_path):
    with fitz.open(file_path) as doc:
        text = ''
        for page in doc:
            text += page.get_text() + '\n'
        return text


# Endpoint for uploading and processing PDF files (admin functionality)
@app.post("/upload/")
async def create_upload_file(file: UploadFile = File(...)):
    # Save the uploaded file temporarily
    temp_file_path = file.filename
    with open(temp_file_path, 'wb') as f:
        content = await file.read()
        f.write(content)

    # Extract text from the PDF
    if file.content_type == 'application/pdf':
        text_data = extract_text_from_pdf(temp_file_path)
    else:
        os.remove(temp_file_path)
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    # Save the extracted data to a text file
    output_filename = f"{os.path.splitext(file.filename)[0]}.txt"
    with open(output_filename, 'w', encoding='utf-8') as text_file:
        text_file.write(text_data)

    # Load, split, process, and upload data to Supabase
    loader = TextLoader(output_filename, encoding='utf-8')
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, chunk_overlap=200)
    docs = text_splitter.split_documents(documents)
    embeddings = OpenAIEmbeddings()

    # Store embeddings and text in Supabase (remove the `timeout` parameter)
    vector_store = SupabaseVectorStore.from_documents(
        docs,
        embeddings,
        client=supabase,
        table_name="documents",
        query_name="match_documents",
        chunk_size=600,
        chunk_overlap=150
    )

    # Cleanup: Delete temporary files
    os.remove(temp_file_path)
    os.remove(output_filename)

    # Print success message
    success_msg = f"File '{file.filename}' has been successfully uploaded and processed."
    print(success_msg)

    return {"filename": file.filename, "status": success_msg}


# Initialize embeddings
embeddings = OpenAIEmbeddings()  # Make sure this is correctly defined


@app.post("/query/")
async def query_documents(request: Request):
    data = await request.json()
    user_query = data.get("query")

    if not user_query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    # Retrieve relevant documents from the vector database
    vector_store = SupabaseVectorStore(
        client=supabase,
        table_name="documents",
        query_name="match_documents",
        embedding=embeddings  # Use the correct embedding object here
    )

    search_results = vector_store.similarity_search(
        user_query, k=3)  # Retrieve top 3 documents

    response_text = "\n\n".join([doc.page_content for doc in search_results])

    return {"response": response_text}
