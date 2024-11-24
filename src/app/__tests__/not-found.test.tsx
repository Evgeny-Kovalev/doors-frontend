import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';

describe('Page', () => {
	it('renders a heading', () => {
		render(<NotFoundPage />);

		const heading = screen.getByRole('heading', { level: 1 });

		expect(heading).toBeInTheDocument();
	});
});
