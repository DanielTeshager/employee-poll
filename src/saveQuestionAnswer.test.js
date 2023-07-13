import * as _DATA from "./_DATA";

// Mock the console.error function
console.error = jest.fn();

describe("_saveQuestionAnswer", () => {
	let mockSaveQuestionAnswer;

	beforeEach(() => {
		// Create a spy for _saveQuestionAnswer
		mockSaveQuestionAnswer = jest.spyOn(_DATA, "_saveQuestionAnswer");
		// Clear all calls to the mock function
		mockSaveQuestionAnswer.mockClear();
		console.error.mockClear();
	});

	it("returns true when correctly formatted data is passed", async () => {
		const authedUser = "sarahedo";
		const qid = "8xf0y6ziyjabvozdd253nd";
		const answer = "optionOne";

		mockSaveQuestionAnswer.mockResolvedValue(true);

		await expect(
			_DATA._saveQuestionAnswer({ authedUser, qid, answer })
		).resolves.toBe(true);

		expect(mockSaveQuestionAnswer).toHaveBeenCalledWith({
			authedUser,
			qid,
			answer,
		});
	});

	it("throws an error if incorrect data is passed", async () => {
		const authedUser = null;
		const qid = null;
		const answer = null;

		const error = new Error("Please provide authedUser, qid, and answer");
		mockSaveQuestionAnswer.mockRejectedValue(error);

		await expect(
			_DATA._saveQuestionAnswer({ authedUser, qid, answer })
		).rejects.toThrow(error);

		expect(mockSaveQuestionAnswer).toHaveBeenCalledWith({
			authedUser,
			qid,
			answer,
		});
	});
});
