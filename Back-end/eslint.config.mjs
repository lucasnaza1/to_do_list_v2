// Importa a configuração básica do plugin ESLint JS
import js from "@eslint/js";
// Importa os globals padrões para vários ambientes, aqui usaremos o node
import globals from "globals";
// Importa a função para definir a configuração do ESLint
import { defineConfig } from "eslint/config";

// Exporta a configuração do ESLint
export default defineConfig([
  {
    // Aplica para arquivos .js, .mjs e .cjs
    files: ["**/*.{js,mjs,cjs}"],
    // Usa o plugin js
    plugins: { js },
    // Estende as regras recomendadas do plugin js
    extends: ["js/recommended"],
  },
  {
    // Para arquivos .js, define o sourceType como commonjs
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    // Define os globals do Node.js para todos os arquivos JS
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.node },
  },
]);
