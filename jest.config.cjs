module.exports = {
  // Inclui arquivos de teste com as extensões .test.js, .test.jsx, .test.ts e .test.tsx
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],

  // Diretórios que o Jest deve ignorar
  testPathIgnorePatterns: ["/node_modules/"],

  // Módulos que devem ser transformados antes de serem executados pelo Jest
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  // Configurar o ambiente de teste para jsdom (necessário para testes de React)
  testEnvironment: "jest-environment-jsdom",

  // Opções adicionais para integração com TypeScript
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
