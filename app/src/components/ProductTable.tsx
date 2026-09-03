import type { Product } from '../types/Product';

interface ProductTableProps {
  produtos: Product[];
  onProdutoClick: (id: number) => void;
}

export function ProductTable({ produtos, onProdutoClick }: ProductTableProps) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={thStyle}>Nome</th>
          <th style={thStyle}>Categoria</th>
          <th style={thStyle}>Preço</th>
          <th style={thStyle}>Estoque</th>
          <th style={thStyle}>Status</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr
            key={produto.id}
            onClick={() => onProdutoClick(produto.id)}
            style={{ cursor: 'pointer' }}
          >
            <td style={tdStyle}>{produto.nome}</td>
            <td style={tdStyle}>{produto.categoria}</td>
            <td style={tdStyle}>
              {produto.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
            <td style={tdStyle}>{produto.estoque}</td>
            <td style={tdStyle}>{produto.ativo ? 'Ativo' : 'Inativo'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  borderBottom: '2px solid #ccc',
  padding: '0.5rem',
};

const tdStyle: React.CSSProperties = {
  borderBottom: '1px solid #eee',
  padding: '0.5rem',
};