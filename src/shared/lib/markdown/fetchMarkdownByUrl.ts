type FetchMarkdownResult = string | null;

export const fetchMarkdownByUrl = async (
	markdownUrl: string | null | undefined,
): Promise<FetchMarkdownResult> => {
	if (!markdownUrl) return null;

	try {
		const res = await fetch(new URL(markdownUrl).toString(), { cache: 'no-store' });
		if (!res.ok) null;

		const content = await res.text();

		return content;
	} catch {
		return null;
	}
};
