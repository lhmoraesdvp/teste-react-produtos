interface FormFieldProps {
  label: string;
  erro?: string;
  children: React.ReactNode;
}

export function FormField({ label, erro, children }: FormFieldProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>
        {label}
      </label>
      {children}
      {erro && (
        <p style={{ color: 'red', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
          {erro}
        </p>
      )}
    </div>
  );
}