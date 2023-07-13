import { _saveQuestion } from "./_DATA";

// Mock the _saveQuestion function
jest.mock("./_DATA", () => ({
	_saveQuestion: jest.fn(),
}));

describe("_saveQuestion", () => {
	const mockSaveQuestion = _saveQuestion;

	beforeEach(() => {
		// Clear mock calls and implementation before each test
		mockSaveQuestion.mockClear();
	});

	it("returns the saved question with all expected fields populated when correctly formatted data is passed", async () => {
		const question = {
			optionOneText: "Option One",
			optionTwoText: "Option Two",
			author: "testUser",
		};

		const savedQuestion = {
			id: "mockedId",
			timestamp: 1234567890,
			optionOne: {
				votes: [],
				text: "Option One",
			},
			optionTwo: {
				votes: [],
				text: "Option Two",
			},
			author: "testUser",
		};

		mockSaveQuestion.mockResolvedValue(savedQuestion);

		await expect(_saveQuestion(question)).resolves.toEqual(savedQuestion);

		expect(mockSaveQuestion).toHaveBeenCalledWith(question);
	});

	it("throws an error if incorrect data is passed", async () => {
		const question = {
			// Invalid data, missing required fields
			optionOneText: "Option One",
		};

		const error = new Error("Invalid question data");
		mockSaveQuestion.mockRejectedValue(error);

		await expect(_saveQuestion(question)).rejects.toThrow(error);

		expect(mockSaveQuestion).toHaveBeenCalledWith(question);
	});
});
