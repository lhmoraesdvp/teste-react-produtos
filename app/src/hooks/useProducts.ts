import { useState, useEffect } from 'react';
import { listarProdutos } from '../services/productService';
import type { Product } from '../types/Product';

interface UseProductsParams {
  page: number;
  limit: number;
  nome: string;
  categoria: string;
}

export function useProducts({ page, limit, nome, categoria }: UseProductsParams) {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true; // evita atualizar estado se o componente já desmontou

    async function carregar() {
      setLoading(true);
      setErro(null);
      try {
        const resultado = await listarProdutos({ page, limit, nome, categoria });
        if (ativo) {
          setProdutos(resultado.data);
          setTotal(resultado.total);
        }
      } catch  {
        if (ativo) {
          setErro('Não foi possível carregar os produtos. Tente novamente.');
        }
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [page, limit, nome, categoria]);

  return { produtos, total, loading, erro };
}