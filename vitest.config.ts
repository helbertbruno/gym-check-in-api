import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    globals: true,

    // Registra o ambiente customizado indicando o caminho direto do arquivo
    environmentMatchGlobs: [
      [
        'src/http/controllers/**',
        './prisma/vitest-environment-prisma/prisma-test-environment.ts',
      ],
    ],

    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-cases',
          environment: 'node',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          // Aponta explicitamente para o caminho do arquivo do ambiente Prisma
          environment:
            './prisma/vitest-environment-prisma/prisma-test-environment.ts',
        },
      },
    ],
  },
})
