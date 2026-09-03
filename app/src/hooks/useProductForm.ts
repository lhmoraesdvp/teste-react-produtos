import { useState, useEffect } from 'react';
import type { ProductInput } from '../types/Product';

const ESTADO_INICIAL: ProductInput = {
  nome: '',
  categoria: '',
  preco: 0,
  estoque: 0,
  ativo: true,
};

interface Erros {
  nome?: string;
  preco?: string;
  estoque?: string;
}

export function useProductForm(valoresIniciais?: ProductInput) {
  const [valores, setValores] = useState<ProductInput>(valoresIniciais ?? ESTADO_INICIAL);
  const [erros, setErros] = useState<Erros>({});

  useEffect(() => {
    if (valoresIniciais) {
      setValores(valoresIniciais);
    }
  }, [valoresIniciais]);

  function validar(): boolean {
    const novosErros: Erros = {};

    if (!valores.nome || valores.nome.trim().length < 3) {
      novosErros.nome = 'Nome é obrigatório e deve ter no mínimo 3 caracteres.';
    }

    if (valores.preco === undefined || valores.preco === null || valores.preco <= 0) {
      novosErros.preco = 'Preço é obrigatório e deve ser maior que zero.';
    }

    if (valores.estoque === undefined || valores.estoque === null || valores.estoque < 0) {
      novosErros.estoque = 'Estoque é obrigatório e deve ser zero ou mais.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function atualizarCampo<K extends keyof ProductInput>(campo: K, valor: ProductInput[K]) {
    setValores((prev) => ({ ...prev, [campo]: valor }));
  }

  return { valores, erros, validar, atualizarCampo };
}