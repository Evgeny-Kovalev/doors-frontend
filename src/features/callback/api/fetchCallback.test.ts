import { fetchCallback } from './fetchCallback';

describe('fetchCallback', () => {
	const originalFetch = global.fetch;

	beforeEach(() => {
		process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
		global.fetch = jest.fn();
	});

	afterEach(() => {
		global.fetch = originalFetch;
		jest.resetAllMocks();
	});

	it('sends payload and returns parsed response', async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({ success: true }),
		});

		const result = await fetchCallback({
			name: 'Ivan',
			phone: '+375(29)111-11-11',
		});

		expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/callback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: 'Ivan',
				phone: '+375(29)111-11-11',
			}),
		});
		expect(result).toEqual({ success: true });
	});

	it('throws on non-ok response', async () => {
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: false,
			status: 500,
		});

		await expect(
			fetchCallback({
				name: 'Ivan',
				phone: '+375(29)111-11-11',
			}),
		).rejects.toThrow('HTTP error! status: 500');
	});
});
