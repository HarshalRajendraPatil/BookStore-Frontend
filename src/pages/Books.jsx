import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books", {
        params: {
          name: searchName,
          genre: searchGenre,
        },
      });
      setBooks(response.data.books);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchName, searchGenre]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-200 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Discover Your Next Read
      </h1>

      {error && (
        <p className="text-red-600 text-center font-medium mb-4">{error}</p>
      )}

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Search by name"
          className="px-4 py-2 rounded-lg border border-gray-300 w-full max-w-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by genre"
          className="px-4 py-2 rounded-lg border border-gray-300 w-full max-w-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={searchGenre}
          onChange={(e) => setSearchGenre(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Search
        </button>
      </form>

      {/* Book List */}
      {books.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No books found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((book) => (
            <Link
              to={`/books/${book._id}`}
              key={book._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 max-h-[460px] flex flex-col"
            >
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-64 object-contain bg-gray-100"
                />
              )}
              <div className="p-4 flex-1 overflow-hidden flex flex-col justify-between">
                <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {book.description || "No description available."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
