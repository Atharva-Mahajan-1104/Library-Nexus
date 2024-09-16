import React, { useEffect, useState } from 'react';
import BookModel from "../../Model/BookModel";
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { SearchBook } from './Components/SearchBook';
import { Pagination } from '../../Utils/Pagination';

export const SearchBooksPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);  // Set to 5 books per page
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const[categorySelection , setCategorySelection] = useState('Book Category')

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";
            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            } else {
                url = baseUrl + searchUrl;
            }

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                const responseJson = await response.json();
                const responseData = responseJson._embedded.books;

                setTotalAmountOfBooks(responseJson.page.totalElements);  // Corrected typo from totalElement to totalElements
                setTotalPages(responseJson.page.totalPages);

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
        window.scrollTo(0, 0);

    }, [currentPage, booksPerPage, searchUrl]);

    // Show spinner while loading
    if (isLoading) {
        return (
            <SpinnerLoading />
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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        searchHandleChange();
    };


    const categoryField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLowerCase() === 'fe' || 
            value.toLowerCase() === 'be' || 
            value.toLowerCase() === 'data' || 
            value.toLowerCase() === 'devops'
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
        } else {
            setCategorySelection('All');
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }
    }
    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ?
        booksPerPage * currentPage : totalAmountOfBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <form className='d-flex' onSubmit={handleSearchSubmit}>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success' type='submit'>
                                    Search
                                </button>
                            </form>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={()=>categoryField('All')}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={()=>categoryField('FE')}>
                                        <a className='dropdown-item' href='#'>
                                            Front End
                                        </a>
                                    </li>
                                    <li onClick={()=>categoryField('BE')}>
                                        <a className='dropdown-item' href='#'>
                                            Back End
                                        </a>
                                    </li>
                                    <li onClick={()=>categoryField('Data')}>
                                        <a className='dropdown-item' href='#'>
                                            Data
                                        </a>
                                    </li>
                                    <li onClick={()=>categoryField('DevOps')}> 
                                        <a className='dropdown-item' href='#'>
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ? (
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: ({totalAmountOfBooks})</h5>
                            </div>
                            <p>
                                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
                            </p>
                            {books.map(book => (
                                <SearchBook book={book} key={book.id} />
                            ))}
                        </>
                    ) : (
                        <div className='m-5'>
                            <h3>Can't Find What You Are Looking For?</h3>
                            <a type='button' className='btn main-color btn-md px-5 me-md-2 fw-bold text-white m-3'>Library Services</a>
                        </div>
                    )}
                    {totalPages > 1 && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    )}
                </div>
            </div>
        </div>
    );
};
