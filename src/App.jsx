import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import AddBook from "./pages/AddBooks";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Wishlist from "./pages/Wishlist";
import Purchase from "./pages/Purchase";
import Orders from "./pages/Order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-books" element={<AddBook />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/purchase/:bookId" element={<Purchase />} />
          <Route path="/my-orders" element={<Orders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
