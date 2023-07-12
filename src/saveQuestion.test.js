import { _saveQuestion } from "./_DATA";

describe("_saveQuestion", () => {
	it("returns the saved question with all expected fields populated when correctly formatted data is passed", async () => {
		const question = {
			optionOneText: "Option One",
			optionTwoText: "Option Two",
			author: "testUser",
		};

		const savedQuestion = await _saveQuestion(question);

		expect(savedQuestion).toHaveProperty("id");
		expect(savedQuestion).toHaveProperty("timestamp");
		expect(savedQuestion).toHaveProperty("optionOne.votes");
		expect(savedQuestion).toHaveProperty("optionOne.text", "Option One");
		expect(savedQuestion).toHaveProperty("optionTwo.votes");
		expect(savedQuestion).toHaveProperty("optionTwo.text", "Option Two");
		expect(savedQuestion).toHaveProperty("author", "testUser");
	});

	it("throws an error if incorrect data is passed", async () => {
		const question = {
			// Invalid data, missing required fields
			optionOneText: "Option One",
		};

		await expect(_saveQuestion(question)).rejects.toThrow(
			"Error: Invalid question data"
		);
	});
});
