import authReducer, { saveQuestion } from "./redux/auth";

describe("auth reducer", () => {
	it("should handle SAVE_QUESTION and update questions state", () => {
		const initialState = {
			questions: {},
		};

		const question = {
			id: "question123",
			author: "user123",
			optionOne: {
				text: "Option One",
				votes: [],
			},
			optionTwo: {
				text: "Option Two",
				votes: [],
			},
		};

		const action = saveQuestion(question, question.author);
		const newState = authReducer(initialState, action);

		expect(Object.keys(newState.questions).length).toBe(1);
	});
});
