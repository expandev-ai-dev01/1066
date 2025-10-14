# Sistema de Gerenciamento de Tarefas (TODO List)

## Descrição

Sistema completo de gerenciamento de tarefas com funcionalidades avançadas de organização, priorização e visualização.

## Tecnologias

- **React 19.2.0** - Framework frontend
- **TypeScript 5.9.3** - Tipagem estática
- **Vite 7.1.9** - Build tool e dev server
- **TailwindCSS 4.1.14** - Framework CSS
- **React Router 7.9.3** - Roteamento
- **TanStack Query 5.90.2** - Gerenciamento de estado do servidor
- **Zustand 5.0.8** - Gerenciamento de estado global
- **React Hook Form 7.63.0** - Gerenciamento de formulários
- **Zod 4.1.11** - Validação de schemas

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Providers globais
│   └── router.tsx         # Configuração de rotas
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
├── domain/               # Domínios de negócio
├── core/                 # Componentes e utilitários compartilhados
│   ├── components/       # Componentes genéricos
│   ├── hooks/           # Hooks customizados
│   ├── lib/             # Configurações de bibliotecas
│   ├── utils/           # Funções utilitárias
│   ├── types/           # Tipos globais
│   └── constants/       # Constantes globais
└── assets/              # Assets estáticos
    └── styles/          # Estilos globais
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Iniciar servidor de desenvolvimento
npm run dev
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linter

## Funcionalidades Planejadas

1. Cadastro de tarefas
2. Listagem de tarefas
3. Edição de tarefas
4. Exclusão de tarefas
5. Marcação de conclusão
6. Categorização de tarefas
7. Definição de prioridades
8. Estabelecimento de prazos
9. Notificações e lembretes
10. Visualização em calendário

## Arquitetura

O projeto segue uma arquitetura modular baseada em domínios, com separação clara entre:

- **Pages**: Componentes de página que orquestram domínios
- **Domain**: Lógica de negócio específica de cada domínio
- **Core**: Componentes e utilitários compartilhados

## Padrões de Código

- TypeScript estrito habilitado
- ESLint configurado com regras React
- Componentes funcionais com hooks
- Nomenclatura em PascalCase para componentes
- Nomenclatura em camelCase para funções e variáveis

## Contribuição

Este é um projeto em desenvolvimento. Contribuições são bem-vindas!

## Licença

MIT