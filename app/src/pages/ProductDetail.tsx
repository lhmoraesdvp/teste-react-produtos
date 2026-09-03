import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { buscarProdutoPorId } from '../services/productService';
import type { Product } from '../types/Product';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function carregar() {
      setLoading(true);
      setErro(null);
      try {
        const resultado = await buscarProdutoPorId(Number(id));
        setProduto(resultado);
      } catch {
        setErro('Produto não encontrado.');
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id]);

  if (loading) return <p style={{ padding: '2rem' }}>Carregando...</p>;
  if (erro) return <p style={{ padding: '2rem', color: 'red' }}>{erro}</p>;
  if (!produto) return null;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/">← Voltar para a listagem</Link>
      <h1>{produto.nome}</h1>
      <p><strong>Categoria:</strong> {produto.categoria}</p>
      <p>
        <strong>Preço:</strong>{' '}
        {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>
      <p><strong>Estoque:</strong> {produto.estoque}</p>
      <p><strong>Status:</strong> {produto.ativo ? 'Ativo' : 'Inativo'}</p>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => navigate(`/produtos/${produto.id}/editar`)}>
          Editar
        </button>
      </div>
    </div>
  );
}