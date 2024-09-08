import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'docs/swagger.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/client/api',
  },
  services: { asClass: true },
  client: 'legacy/fetch',
  types: {
    enums: 'typescript',
  },
})
