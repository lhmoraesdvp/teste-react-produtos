import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProductForm } from './useProductForm';

describe('useProductForm', () => {
  it('deve iniciar com valores padrão vazios', () => {
    const { result } = renderHook(() => useProductForm());

    expect(result.current.valores.nome).toBe('');
    expect(result.current.valores.preco).toBe(0);
    expect(result.current.valores.estoque).toBe(0);
  });

  it('deve invalidar nome com menos de 3 caracteres', () => {
    const { result } = renderHook(() => useProductForm());

    act(() => {
      result.current.atualizarCampo('nome', 'ab');
    });

    let valido = true;
    act(() => {
      valido = result.current.validar();
    });

    expect(valido).toBe(false);
    expect(result.current.erros.nome).toBeDefined();
  });

  it('deve invalidar preço igual ou menor que zero', () => {
    const { result } = renderHook(() => useProductForm());

    act(() => {
      result.current.atualizarCampo('nome', 'Produto válido');
      result.current.atualizarCampo('preco', 0);
    });

    let valido = true;
    act(() => {
      valido = result.current.validar();
    });

    expect(valido).toBe(false);
    expect(result.current.erros.preco).toBeDefined();
  });

  it('deve invalidar estoque negativo', () => {
    const { result } = renderHook(() => useProductForm());

    act(() => {
      result.current.atualizarCampo('nome', 'Produto válido');
      result.current.atualizarCampo('preco', 10);
      result.current.atualizarCampo('estoque', -1);
    });

    let valido = true;
    act(() => {
      valido = result.current.validar();
    });

    expect(valido).toBe(false);
    expect(result.current.erros.estoque).toBeDefined();
  });

  it('deve validar com sucesso quando todos os campos estão corretos', () => {
    const { result } = renderHook(() => useProductForm());

    act(() => {
      result.current.atualizarCampo('nome', 'Produto válido');
      result.current.atualizarCampo('preco', 99.9);
      result.current.atualizarCampo('estoque', 5);
    });

    let valido = false;
    act(() => {
      valido = result.current.validar();
    });

    expect(valido).toBe(true);
    expect(Object.keys(result.current.erros)).toHaveLength(0);
  });
});