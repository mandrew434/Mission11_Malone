import './App.css';
import { CartProvider } from './context/CartContext';
import BooksPage from './pages/BooksPage';
import BuyBooksPage from './pages/BuyBookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import AdminBooksPage from './pages/AdminBooksPage';


function App() {

  
  // This is the main App component that sets up the routing for the application. It uses the BrowserRouter from react-router-dom to define different routes for the application.
  // The CartProvider wraps the entire application to provide cart functionality across all pages.
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/buybook/:bookId/:title/:author/:price/:category" element={<BuyBooksPage/>}/>
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/admin" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
      
  );
}

export default App