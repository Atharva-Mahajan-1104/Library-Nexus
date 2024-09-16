import React, { useEffect, useState } from 'react';
import ImgBookluv2code from "../../../Images/BooksImages/book-luv2code-1000.png";
import { ReturnBook } from "./ReturnBook";
import BookModel from "../../../Model/BookModel";
import { SpinnerLoading } from "../../../Utils/SpinnerLoading";
import { Link } from 'react-router-dom';

// Define the heading style
const headingStyle: React.CSSProperties = {
    color: '#7e7ad2',
    fontFamily: 'Helvetica',
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    marginBottom: '20px'
};

export const Carousel: React.FC = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    // Fetch books data from the API
    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";
            const url: string = `${baseUrl}?page=0&size=9`;
            
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                const responseJson = await response.json();
                const responseData = responseJson._embedded.books;

                // Map the response data to BookModel objects
                const loadedBooks: BookModel[] = responseData.map((book: any) => ({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    description: book.description,
                    copies: book.copies,
                    copiesAvailable: book.copiesAvailable,
                    category: book.category,
                    img: book.img,
                }));

                setBooks(loadedBooks);
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };

        fetchBooks();
    }, []);

    // Show spinner while loading
    if (isLoading) {
        return (
           <SpinnerLoading/>
        );
    }

    // Show error message if there's an error
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className='container mt-5' style={{ height: 550, backgroundColor: '#E9F1FA' }}>
            <div className='homepage-carousel-title'>
                {/* Apply the defined heading style */}
                <h3 style={headingStyle}>
                    Find Your Next Page-Turner!
                </h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 d-none d-lg-block' data-bs-interval='false'>
                <div className='carousel-inner'>
                    {books.length > 0 && (
                        <>
                            <div className='carousel-item active'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {books.slice(0, 3).map((book) => (
                                        <ReturnBook book={book} key={book.id} />
                                    ))}
                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {books.slice(3, 6).map((book) => (
                                        <ReturnBook book={book} key={book.id} />
                                    ))}
                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {books.slice(6, 9).map((book) => (
                                        <ReturnBook book={book} key={book.id} />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <button className='carousel-control-prev' type='button' data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button' data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* Mobile view */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='text-center'>
                        {books.length > 0 && <ReturnBook book={books[0]} key={books[0].id} />}
                    </div>
                </div>
            </div>
            <div className='homepage-carousel-title mt-4'>
    <Link className='btn btn-outline-secondary btn-lg' to='/search' 
        style={{ 
            color: '#FFFFFF', 
            borderColor: '#7e7ad2', 
            backgroundColor: '#af7ac5'
        }}>
        View More
    </Link>
        </div>

        </div>
    );
};
