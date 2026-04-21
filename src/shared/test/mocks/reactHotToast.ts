export const toastMock = {
	success: jest.fn(),
	error: jest.fn(),
	dismiss: jest.fn(),
};

export const reactHotToastMock = {
	__esModule: true,
	default: toastMock,
};
