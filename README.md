# 📅 Agenda Rápido

O **Agenda Rápido** é uma plataforma moderna de gerenciamento de agendamentos e clientes, desenvolvida para oferecer uma experiência fluida e intuitiva tanto para prestadores de serviço quanto para usuários finais.

## 🚀 Tecnologias e Ferramentas

O projeto foi construído utilizando as versões mais recentes das melhores ferramentas do ecossistema Frontend:

### Core

- **React 19**: Aproveitando as melhorias de performance e novos hooks.
- **TypeScript 5.9**: Tipagem estrita para maior segurança e produtividade.
- **Vite 7**: Build tool de última geração com suporte a SWC.
- **React Router Dom 7**: Gerenciamento de rotas e navegação SPA.

### Estilização e UI

- **Tailwind CSS 4**: Estilização baseada em utilitários com a nova engine v4.
- **Radix UI**: Componentes primitivos acessíveis e sem estilização forçada.
- **Shadcn/UI**: Componentes de interface reutilizáveis e customizáveis.
- **Motion**: Animações fluidas e declarativas.
- **Lucide React**: Biblioteca de ícones moderna e leve.

### Gestão de Dados e Gráficos

- **TanStack Table v8**: Tabelas poderosas com suporte a filtros, ordenação e paginação.
- **Recharts 3**: Visualização de dados dinâmica para o Dashboard.
- **UUID**: Geração de identificadores únicos para clientes e eventos.

---

## 🛠️ Configurações de Código

O projeto possui um fluxo de trabalho otimizado para manter a organização e padronização do código:

- **Import Sorting**: Organização automática de imports via `@trivago/prettier-plugin-sort-imports` e `prettier-plugin-organize-imports`.
- **Tailwind Organizing**: As classes do Tailwind são automaticamente ordenadas para melhor leitura.
- **ESLint 9**: Verificação rigorosa de padrões de código e boas práticas de hooks.

---

## 🏃 Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão recomendada v20 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:

   ```bash
   git clone [https://github.com/victors21dev/agenda-rapido](https://github.com/victors21dev/agenda-rapido)
   ```

2. Entre na pasta::

   ```bash
   cd agenda-rapido
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

## 🏃 Funcionalidades Atuais

[x] Dashboard com métricas semanais e volume de atendimentos.
[x] Gerenciamento completo de Clientes (CRUD).
[x] Agendamento de serviços com validação de horários de funcionamento.
[x] Filtros de pesquisa em tempo real.
[x] Persistência de dados via LocalStorage.
