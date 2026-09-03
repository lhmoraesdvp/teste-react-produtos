import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductFilters } from './ProductFilters';

describe('ProductFilters', () => {
  it('deve renderizar o campo de busca e o select de categoria', () => {
    render(
      <ProductFilters
        busca=""
        onBuscaChange={() => {}}
        categoria=""
        onCategoriaChange={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('Buscar por nome...')).toBeInTheDocument();
    expect(screen.getByText('Todas as categorias')).toBeInTheDocument();
  });

  it('deve chamar onBuscaChange ao digitar no campo de busca', async () => {
    const onBuscaChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ProductFilters
        busca=""
        onBuscaChange={onBuscaChange}
        categoria=""
        onCategoriaChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText('Buscar por nome...');
    await user.type(input, 'mouse');

    expect(onBuscaChange).toHaveBeenCalled();
  });

  it('deve chamar onCategoriaChange ao selecionar uma categoria', async () => {
    const onCategoriaChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ProductFilters
        busca=""
        onBuscaChange={() => {}}
        categoria=""
        onCategoriaChange={onCategoriaChange}
      />
    );

    const select = screen.getByDisplayValue('Todas as categorias');
    await user.selectOptions(select, 'Audio');

    expect(onCategoriaChange).toHaveBeenCalledWith('Audio');
  });
});