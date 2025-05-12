import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
	input: '../backend/swagger.json',
	output: {
		format: 'biome',
		lint: 'biome',
		path: './src/client',
		case: 'camelCase',
		clean: true,
	},
	client: '@hey-api/client-axios',
	plugins: [
		...defaultPlugins,
		{
			name: '@tanstack/react-query',
			queryOptions: true,
		},
		{
			name: '@hey-api/sdk',
			serviceNameBuilder: '{{name}}Service',
			asClass: true,
			throwOnError: true,
		},
	],
})
