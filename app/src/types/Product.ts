export interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  ativo: boolean;
}

// Tipo usado ao criar/editar (sem o id, que é gerado pela API)
export type ProductInput = Omit<Product, 'id'>;

// Resposta paginada que vamos montar a partir do header X-Total-Count
export interface PaginatedProducts {
  data: Product[];
  total: number;
}