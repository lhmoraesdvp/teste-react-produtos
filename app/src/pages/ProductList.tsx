import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { ProductFilters } from '../components/ProductFilters';
import { ProductTable } from '../components/ProductTable';
import { Pagination } from '../components/Pagination';

const ITENS_POR_PAGINA = 10;

export function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const pagina = Number(searchParams.get('page') ?? '1');
  const busca = searchParams.get('nome') ?? '';
  const categoria = searchParams.get('categoria') ?? '';

  const buscaDebounced = useDebounce(busca, 500);

  const { produtos, total, loading, erro } = useProducts({
    page: pagina,
    limit: ITENS_POR_PAGINA,
    nome: buscaDebounced,
    categoria,
  });

  function atualizarParams(novosValores: Record<string, string>) {
    const params = new URLSearchParams(searchParams);
    Object.entries(novosValores).forEach(([chave, valor]) => {
      if (valor) {
        params.set(chave, valor);
      } else {
        params.delete(chave);
      }
    });
    setSearchParams(params);
  }

  function handleBuscaChange(valor: string) {
    atualizarParams({ nome: valor, page: '1' });
  }

  function handleCategoriaChange(valor: string) {
    atualizarParams({ categoria: valor, page: '1' });
  }

  function handlePageChange(novaPagina: number) {
    atualizarParams({ page: String(novaPagina) });
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
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}