import PageLogin from "../pages/PageLogin/index";
import HomePage from "../pages/HomePage/index";
import BookSelected from "../pages/BookSelected/index";
import CategoriaPage from "../pages/CategoriaPage/index";
import CarrinhoPage from "../pages/CarrinhoPage/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarrinhoProvider } from "../contexto/index";

function App() {
  return (
    <CarrinhoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/livro/:id" element={<BookSelected />} />
          <Route path="/categoria/:genero" element={<CategoriaPage />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
        </Routes>
      </BrowserRouter>
    </CarrinhoProvider>
  );
}

export default App;