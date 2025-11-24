export const createFeedbackMutation = async (data: {
	name: string;
	phone: string;
	text: string;
}): Promise<{ success: boolean }> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

	return response.json();
};
