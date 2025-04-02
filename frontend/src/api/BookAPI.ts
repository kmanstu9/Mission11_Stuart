import { Book } from "../types/book";

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;

}

const API_URL = "https://bookstore-stuart-backend.azurewebsites.net"; // base URL for the API

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
  ): Promise<FetchBooksResponse> => {
  
    try{
        const categoryParams = selectedCategories
        .map((category) => `categories=${encodeURIComponent(category)}`)
        .join('&');
      

            const response = await fetch(
                `${API_URL}/api/Bookstore?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ``}`
            );



            if (!response.ok) {
                throw new Error(`Failed to fetch books`);
            }
            return await response.json();
    }
        catch (error) 
        {
            console.error("Error fetching books:", error) 
            throw error; // rethrow the error to be handled by the calling function
        }
    
};


export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/api/Bookstore/AddBook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        });

        if (!response.ok) {
            throw new Error(`Failed to add book`);
        }
        
        return await response.json();
    } catch (error)
    {
        console.error("Error adding book:", error);
        throw error;
    }
};


export const updateBook = async (bookid: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/api/Bookstore/UpdateBook/${bookid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        });

        if (!response.ok) {
            throw new Error(`Failed to update book`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}



export const deleteBook = async (bookid: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/api/Bookstore/DeleteBook/${bookid}`, 
        {
            method: "DELETE",
        }
    );

        if (!response.ok) {
            throw new Error(`Failed to delete book`);
        }
    }
    catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
}


