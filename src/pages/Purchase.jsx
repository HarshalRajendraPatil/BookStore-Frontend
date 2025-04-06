import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

const Purchase = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${bookId}`);
        setBook(response.data.book);
      } catch (err) {
        toast.error(
          err.response?.data?.error || "Failed to fetch book details."
        );
        setError("Failed to fetch book details");
      }
    };

    fetchBook();
  }, [bookId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const response = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user);
      } catch (err) {
        toast.error(
          err.response?.data?.error || "Failed to fetch user details."
        );
        setError("Failed to fetch user details");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      await api.post("/order", { bookId });
      toast.success("Order placed successfully.");
      navigate("/my-orders");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to place the order.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = () => {
    navigate(-1);
  };

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4">
      {book && user ? (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            Order Summary
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full md:w-1/2 max-h-96 object-contain bg-white rounded-lg"
              />
            )}

            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {book.title}
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Price:</strong> ${book.price}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Stock:</strong>{" "}
                  {book.stock > 0 ? "Available" : "Out of Stock"}
                </p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">
                  Your Details
                </h3>
                <p className="text-gray-700">
                  <strong>Name:</strong> {user.username}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xl text-gray-800 font-semibold text-right">
            Total Price: ${book.price}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleConfirmOrder}
              disabled={loading}
              className={`py-3 px-6 rounded-lg text-white font-medium transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>

            <button
              onClick={handleCancelOrder}
              className="py-3 px-6 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-600">
          Loading order details...
        </p>
      )}
    </div>
  );
};

export default Purchase;
