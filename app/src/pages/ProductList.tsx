import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { ProductFilters } from '../components/ProductFilters';
import { ProductTable } from '../components/ProductTable';
import { Pagination } from '../components/Pagination';
import { Link, useNavigate } from 'react-router-dom';

const ITENS_POR_PAGINA = 10;

export function ProductList() {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('');

  const buscaDebounced = useDebounce(busca, 500);
  const navigate = useNavigate();

  const { produtos, total, loading, erro } = useProducts({
    page: pagina,
    limit: ITENS_POR_PAGINA,
    nome: buscaDebounced,
    categoria,
  });

  function handleBuscaChange(valor: string) {
    setBusca(valor);
    setPagina(1); // volta pra página 1 ao mudar a busca
  }

  function handleCategoriaChange(valor: string) {
    setCategoria(valor);
    setPagina(1); // volta pra página 1 ao mudar o filtro
  }

  function handleProdutoClick(id: number) {
   navigate(`/produtos/${id}`);
}

  return (
   <div className="container">
      <h1>Produtos</h1>

<Link to="/produtos/novo">
  <button style={{ marginBottom: '1rem' }}>+ Novo Produto</button>
</Link>

      <ProductFilters
        busca={busca}
        onBuscaChange={handleBuscaChange}
        categoria={categoria}
        onCategoriaChange={handleCategoriaChange}
      />

      {loading && <p>Carregando produtos...</p>}

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {!loading && !erro && produtos.length === 0 && (
        <p>Nenhum produto encontrado.</p>
      )}

      {!loading && !erro && produtos.length > 0 && (
        <>
          <ProductTable produtos={produtos} onProdutoClick={handleProdutoClick} />
          <Pagination
            paginaAtual={pagina}
            totalItens={total}
            itensPorPagina={ITENS_POR_PAGINA}
            onPageChange={setPagina}
          />
        </>
      )}
    </div>
  );
}