interface ProductFiltersProps {
  busca: string;
  onBuscaChange: (valor: string) => void;
  categoria: string;
  onCategoriaChange: (valor: string) => void;
}

const CATEGORIAS = [
  'Perifericos',
  'Monitores',
  'Audio',
  'Armazenamento',
  'Componentes',
  'Acessorios',
];

export function ProductFilters({
  busca,
  onBuscaChange,
  categoria,
  onCategoriaChange,
}: ProductFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={busca}
        onChange={(e) => onBuscaChange(e.target.value)}
      />

      <select
        value={categoria}
        onChange={(e) => onCategoriaChange(e.target.value)}
      >
        <option value="">Todas as categorias</option>
        {CATEGORIAS.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}