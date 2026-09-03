import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProductForm } from '../hooks/useProductForm';
import { FormField } from '../components/FormField';
import {
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
} from '../services/productService';
import type { Product, ProductInput } from '../types/Product';

const CATEGORIAS = [
  'Perifericos',
  'Monitores',
  'Audio',
  'Armazenamento',
  'Componentes',
  'Acessorios',
];

export function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const modoEdicao = Boolean(id);

  const [valoresIniciais, setValoresIniciais] = useState<ProductInput | undefined>(undefined);
  const [carregandoProduto, setCarregandoProduto] = useState(modoEdicao);
  const [erroCarregamento, setErroCarregamento] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  const { valores, erros, validar, atualizarCampo } = useProductForm(valoresIniciais);

  useEffect(() => {
    if (!modoEdicao || !id) return;

    async function carregar() {
      setCarregandoProduto(true);
      setErroCarregamento(null);
      try {
        const produto: Product = await buscarProdutoPorId(Number(id));
        const { id: _id, ...resto } = produto;
        setValoresIniciais(resto);
      } catch {
        setErroCarregamento('Não foi possível carregar o produto para edição.');
      } finally {
        setCarregandoProduto(false);
      }
    }

    carregar();
  }, [id, modoEdicao]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSucesso(false);
    setErroSalvar(null);

    if (!validar()) return;

    setSalvando(true);
    try {
      if (modoEdicao && id) {
        await atualizarProduto(Number(id), valores);
      } else {
        await criarProduto(valores);
      }
      setSucesso(true);
      setTimeout(() => navigate('/'), 1200);
    } catch {
      setErroSalvar('Não foi possível salvar o produto. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  if (carregandoProduto) return <p style={{ padding: '2rem' }}>Carregando produto...</p>;
  if (erroCarregamento) return <p style={{ padding: '2rem', color: 'red' }}>{erroCarregamento}</p>;

  return (
    <div className="container">
      <Link to="/">← Voltar para a listagem</Link>
      <h1>{modoEdicao ? 'Editar Produto' : 'Novo Produto'}</h1>

      <form onSubmit={handleSubmit}>
        <FormField label="Nome" erro={erros.nome}>
          <input
            type="text"
            value={valores.nome}
            onChange={(e) => atualizarCampo('nome', e.target.value)}
          />
        </FormField>

        <FormField label="Categoria">
          <select
            value={valores.categoria}
            onChange={(e) => atualizarCampo('categoria', e.target.value)}
          >
            <option value="">Selecione...</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Preço" erro={erros.preco}>
          <input
            type="number"
            step="0.01"
            value={valores.preco}
            onChange={(e) => atualizarCampo('preco', Number(e.target.value))}
          />
        </FormField>

        <FormField label="Estoque" erro={erros.estoque}>
          <input
            type="number"
            value={valores.estoque}
            onChange={(e) => atualizarCampo('estoque', Number(e.target.value))}
          />
        </FormField>

        <FormField label="Ativo">
          <input
            type="checkbox"
            checked={valores.ativo}
            onChange={(e) => atualizarCampo('ativo', e.target.checked)}
          />
        </FormField>

        {erroSalvar && <p style={{ color: 'red' }}>{erroSalvar}</p>}
        {sucesso && <p style={{ color: 'green' }}>Produto salvo com sucesso!</p>}

        <button type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}