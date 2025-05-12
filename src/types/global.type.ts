type PageProps<Params = {}, SearchParams = {}> = {
	params: Promise<Params>
	searchParams: Promise<SearchParams>
}

export type { PageProps }
