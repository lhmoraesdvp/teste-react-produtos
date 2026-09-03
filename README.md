# Painel de Gerenciamento de Produtos

Teste prático para a vaga de Desenvolvedor(a) Pleno Front-End (React), desenvolvido consumindo uma API fake (json-server) a partir do `db.json` fornecido.

## Tecnologias utilizadas

- React 18+ com TypeScript
- Vite (setup e bundler)
- React Router DOM (navegação entre telas, detecção de modo criar/editar e sincronização de filtros com a URL)
- CSS puro (sem biblioteca de componentes visuais)
- json-server (API fake fornecida no desafio)

## Como rodar o projeto

### Pré-requisitos
- Node.js 18 ou superior instalado

### 1. Suba a API fake

Na raiz do repositório (onde está o `db.json`), rode:

```
npx json-server@0.17.4 --watch db.json --port 3001
```

Isso deixa a API disponível em `http://localhost:3001/produtos`. Deixe esse terminal aberto.

### 2. Instale as dependências e rode o front-end

Em outro terminal, entre na pasta do projeto React:

```
cd app
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

> Importante: a API fake precisa estar rodando na porta 3001 para o front funcionar, já que a URL base está fixada em `http://localhost:3001/produtos` no arquivo de service.

## Funcionalidades implementadas

### Listagem de produtos
- Tabela com nome, categoria, preço, estoque e status
- Busca por nome, com debounce de 500ms (evita chamar a API a cada tecla digitada)
- Filtro por categoria
- Paginação real via API (usando `_page` e `_limit` do json-server), com total de registros lido do header `X-Total-Count`
- Estados de carregamento, erro e "nenhum resultado encontrado" tratados visualmente
- Botão "Novo Produto" e botão "Detalhes" em cada linha, além do clique na própria linha
- Busca, categoria e página refletidos na URL (ex: `?nome=teclado&categoria=Audio&page=2`), permitindo recarregar ou compartilhar o link mantendo os filtros aplicados

### Detalhe do produto
- Exibe todos os dados do produto selecionado
- Botões para editar ou excluir o produto a partir dessa tela

### Criar e editar produto
- Um único componente de formulário atende os dois casos (detecta o modo pela presença do `id` na URL)
- Validações:
  - Nome obrigatório, mínimo 3 caracteres
  - Preço obrigatório, maior que zero
  - Estoque obrigatório, zero ou mais
- Mensagens de erro exibidas junto de cada campo (não em alert genérico)
- Feedback de sucesso exibido após salvar, com redirecionamento automático para a listagem

### Excluir produto
- Confirmação via `window.confirm()` antes de excluir
- Após confirmar, o produto é removido e o usuário retorna à listagem

## Itens bônus

- [x] **TypeScript bem utilizado** — tipos `Product` e `ProductInput` para os dados de produto, tipagem das respostas da API (`PaginatedProducts`) e tipagem de props em todos os componentes
- [x] **Debounce na busca por nome** — implementado via hook customizado `useDebounce`, com 500ms de atraso antes de disparar a chamada à API
- [x] **React Router com URLs refletindo o estado** — busca, categoria e página sincronizadas com a URL via `useSearchParams`, permitindo recarregar a página ou compartilhar o link mantendo os filtros aplicados
- [ ] **Testes com React Testing Library** — não implementados por restrição de tempo (ver seção abaixo)

## Arquitetura e decisões técnicas

- **Camada de API centralizada**: todas as chamadas HTTP ficam em `src/services/productService.ts`. Nenhum componente faz `fetch` diretamente — eles chamam funções desse service ou hooks que o utilizam.
- **Hooks customizados**: `useProducts` (busca de dados da listagem com loading/erro), `useDebounce` (debounce genérico e reutilizável) e `useProductForm` (estado e validação do formulário) isolam lógica de estado da camada visual.
- **Componentização**: a interface foi dividida em componentes pequenos e específicos (`ProductTable`, `ProductFilters`, `Pagination`, `FormField`), evitando arquivos grandes e concentrando responsabilidades únicas em cada um.
- **Tipagem**: `Product` e `ProductInput` (produto sem `id`, usado em criação/edição) tipam os dados trocados com a API.
- **Filtros na URL**: a listagem usa `useSearchParams` do React Router em vez de `useState` isolado para busca, categoria e página, mantendo a URL como fonte da verdade desses filtros.
- **Confirmação de exclusão via `window.confirm`**: optei pela API nativa do navegador por rapidez e simplicidade de implementação. Funcionalmente atende ao requisito (pedido de confirmação antes de excluir), mas um modal customizado renderizado no React seria a evolução natural caso houvesse mais tempo ou fosse necessário um visual mais consistente com o resto da aplicação.

## O que não foi implementado / próximos passos

- **Testes automatizados (React Testing Library)**: não implementados por restrição de tempo. Se fosse continuar, começaria testando a validação do `useProductForm` isoladamente (por já estar desacoplada da renderização) e depois um teste de integração da tela de Listagem cobrindo os estados de loading/erro/vazio.
- **Lista de categorias dinâmica**: o filtro de categoria usa uma lista fixa no código, extraída manualmente dos dados de exemplo do `db.json`, já que a API não expõe um endpoint de categorias únicas. O ideal seria derivar essa lista dinamicamente a partir dos produtos existentes.
- **Modal de confirmação customizado**: como mencionado acima, a exclusão usa `window.confirm()` nativo em vez de um componente modal próprio do design da aplicação.

## Estrutura de pastas

```
app/
├── src/
│   ├── components/     # Componentes visuais reutilizáveis
│   ├── pages/           # Telas (Listagem, Detalhe, Formulário)
│   ├── services/        # Chamadas de API centralizadas
│   ├── hooks/            # Hooks customizados (dados, debounce, validação)
│   ├── types/            # Tipos TypeScript
│   ├── App.tsx           # Configuração das rotas
│   └── main.tsx
```
