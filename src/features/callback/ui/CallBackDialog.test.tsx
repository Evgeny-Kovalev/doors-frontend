import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { reactHotToastMock, toastMock } from '@/shared/test/mocks';

import { CallBackDialog } from './CallBackDialog';

const mockFetchCallback = jest.fn();

jest.mock('@/shared/hooks', () => ({
	useMediaQuery: () => true,
}));

jest.mock('../api/fetchCallback', () => ({
	fetchCallback: (...args: unknown[]) => mockFetchCallback(...args),
}));

jest.mock('react-hot-toast', () => reactHotToastMock);

describe('CallBackDialog', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('submits valid form and shows success toast', async () => {
		mockFetchCallback.mockResolvedValue({ success: true });

		render(
			<CallBackDialog>
				<button>Open callback</button>
			</CallBackDialog>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Open callback' }));

		fireEvent.change(screen.getByPlaceholderText('Ваше имя'), {
			target: { value: 'Иван' },
		});
		fireEvent.change(screen.getByPlaceholderText('+375 (__) ___-__-__'), {
			target: { value: '+375 (29) 111-11-11' },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Отправить' }));

		await waitFor(() =>
			expect(mockFetchCallback).toHaveBeenCalledWith({
				name: 'Иван',
				phone: '+375(29)111-11-11',
			}),
		);
		expect(toastMock.success).toHaveBeenCalled();
	});

	it('shows validation messages for invalid submit', async () => {
		render(
			<CallBackDialog>
				<button>Open callback</button>
			</CallBackDialog>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Open callback' }));
		fireEvent.click(screen.getByRole('button', { name: 'Отправить' }));

		expect(
			await screen.findByText('Имя должно быть не меньше 2 символов'),
		).toBeInTheDocument();
		expect(await screen.findByText('Неверный формат телефона')).toBeInTheDocument();
	});
});
