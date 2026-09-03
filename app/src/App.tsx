import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { ProductForm } from './pages/ProductForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/produtos/:id" element={<ProductDetail />} />
        <Route path="/produtos/novo" element={<ProductForm />} />
        <Route path="/produtos/:id/editar" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;