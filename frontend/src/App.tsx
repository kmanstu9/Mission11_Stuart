import './App.css'
import BookPage from './Pages/BookPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartSummary from './Components/CartSummary'
import CartPage from './Pages/CartPage'
import { CartProvider } from './context/CartContext'
import AdminPage from './Pages/AdminPage'


function App() {

  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<BookPage />} />   {/* will take Projects page as home ( / ) */}
          <Route path='/cart/:title/:bookId' element={<CartSummary />} />  {/*  /donate will take you to the donates page*/}
          <Route path='/bookList' element={<BookPage />} />   {/* will take Projects page as home ( / ) */}
          <Route path='/cart' element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />


        </Routes>
      </Router>
      </CartProvider>
    </>
  )
}

export default App
