import type { Product, ProductInput, PaginatedProducts } from '../types/Product';

const BASE_URL = 'http://localhost:3001/produtos';

interface ListParams {
  page?: number;
  limit?: number;
  nome?: string;
  categoria?: string;
}

export async function listarProdutos(params: ListParams = {}): Promise<PaginatedProducts> {
  const { page = 1, limit = 10, nome, categoria } = params;

  const query = new URLSearchParams();
  query.set('_page', String(page));
  query.set('_limit', String(limit));
  if (nome) query.set('nome_like', nome);
  if (categoria) query.set('categoria', categoria);

  const response = await fetch(`${BASE_URL}?${query.toString()}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  const data: Product[] = await response.json();
  const total = Number(response.headers.get('X-Total-Count') ?? data.length);

  return { data, total };
}

export async function buscarProdutoPorId(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Produto não encontrado');
  }

  return response.json();
}

export async function criarProduto(produto: ProductInput): Promise<Product> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar produto');
  }

  return response.json();
}

export async function atualizarProduto(id: number, produto: ProductInput): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar produto');
  }

  return response.json();
}

export async function excluirProduto(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir produto');
  }
}