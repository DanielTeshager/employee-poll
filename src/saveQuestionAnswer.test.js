import { _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestionAnswer", () => {
	it("returns true when correctly formatted data is passed", async () => {
		const authedUser = "sarahedo";
		const qid = "8xf0y6ziyjabvozdd253nd";
		const answer = "optionOne";

		await expect(
			_saveQuestionAnswer({ authedUser, qid, answer })
		).resolves.toBe(true);
	});

	it("throws an error if incorrect data is passed", async () => {
		const authedUser = null;
		const qid = null;
		const answer = null;

		await expect(
			_saveQuestionAnswer({ authedUser, qid, answer })
		).rejects.toThrow("Please provide authedUser, qid, and answer");
	});
});
