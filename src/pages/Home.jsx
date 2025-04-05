const Home = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-5xl font-extrabold mb-4 text-indigo-600">
          Welcome to Our Book Store
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Discover a wide range of books, from bestsellers to classics. Whether
          you&apos;re a reader, a vendor, or an admin, we have something for
          everyone!
        </p>
      </div>

      <div className="mt-10 p-8 bg-white shadow-lg rounded-lg w-3/4">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600">Features</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>📚 Browse a vast collection of books.</li>
          <li>💖 Add books to your wishlist for later.</li>
          <li>🛒 Purchase books easily and securely.</li>
          <li>📦 Vendors can add their books for sale.</li>
          <li>📊 Admins can manage users, vendors, and orders.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
