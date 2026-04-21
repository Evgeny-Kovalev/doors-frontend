import { act, fireEvent, render, screen } from '@testing-library/react';
import { FeedbackForm } from './FeedBackForm';

jest.mock('./IssueForm', () => ({
	IssueForm: ({ onSuccess }: { onSuccess?: () => void }) => (
		<div>
			IssueForm mock
			<button onClick={onSuccess}>Finish issue flow</button>
		</div>
	),
}));

describe('FeedbackForm', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('opens issue form from negative feedback path', () => {
		render(<FeedbackForm />);

		const buttons = screen.getAllByRole('button');
		fireEvent.click(buttons[0]);

		expect(screen.getByText('Сообщить о проблеме')).toBeInTheDocument();
		expect(screen.getByText('IssueForm mock')).toBeInTheDocument();
	});

	it('enables continue and reaches final step on positive feedback path', () => {
		render(<FeedbackForm />);

		fireEvent.click(screen.getAllByRole('button')[1]);

		expect(screen.getByText('Где вам удобно оставить отзыв?')).toBeInTheDocument();

		const continueButton = screen.getByRole('button', { name: 'Продолжить' });

		expect(continueButton).toBeDisabled();

		fireEvent.click(screen.getAllByRole('link')[0]);

		act(() => {
			jest.advanceTimersByTime(1000);
		});

		expect(continueButton).toBeEnabled();
		fireEvent.click(continueButton);

		expect(screen.getByText('Спасибо за оставленный отзыв!')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Входные двери' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Межкомнатные двери' })).toBeInTheDocument();
	});
});
