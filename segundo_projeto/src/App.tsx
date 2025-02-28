import PageLogin from "../pages/PageLogin/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLogin />} />
        <Route path="/home" element={<h1>Bem-vindo à Home</h1>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
