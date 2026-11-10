# Task Manager — prática com Playwright

Projeto independente para praticar automação de testes web. Não utiliza banco de dados: as tarefas ficam na memória do navegador e reiniciar a página limpa a lista.

## Requisitos
- Node.js instalado
- npm

## Instalação
Abra o terminal nesta pasta e execute:

```bash
npm install
npx playwright install chromium
```

## Executar a aplicação manualmente
```bash
npm start
```
Acesse http://localhost:3000

## Executar os testes
O Playwright inicia o servidor automaticamente pela configuração `webServer`.

```bash
npm test
```

Para abrir o navegador durante os testes:
```bash
npm run test:headed
```

## Capturas de tela
Os testes salvam capturas automaticamente na pasta `screenshots/`, criada quando os testes rodam. Os arquivos possuem nomes diferentes para não sobrescrever as imagens.

As capturas explícitas são independentes da opção `screenshot: 'only-on-failure'`, que guarda imagens adicionais apenas quando um teste falha.

## Login de demonstração
- Usuário: `aluno`
- Senha: `playwright123`

Este login é apenas demonstrativo, não é um sistema de autenticação seguro.
