interface PaginationProps {
  paginaAtual: number;
  totalItens: number;
  itensPorPagina: number;
  onPageChange: (pagina: number) => void;
}

export function Pagination({
  paginaAtual,
  totalItens,
  itensPorPagina,
  onPageChange,
}: PaginationProps) {
  const totalPaginas = Math.ceil(totalItens / itensPorPagina);

  if (totalPaginas <= 1) return null;

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1rem' }}>
      <button
        onClick={() => onPageChange(paginaAtual - 1)}
        disabled={paginaAtual === 1}
      >
        Anterior
      </button>

      <span>
        Página {paginaAtual} de {totalPaginas} ({totalItens} produtos)
      </span>

      <button
        onClick={() => onPageChange(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
      >
        Próxima
      </button>
    </div>
  );
}