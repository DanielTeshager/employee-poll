import authReducer from "./redux/auth";
import { setQuestions } from "./redux/auth";

describe("auth reducer", () => {
	it("should initialize questions correctly", () => {
		const initialState = {
			questions: {},
		};

		const questions = {
			// Provide your test questions here
			question1: {
				id: "question1",
				text: "Question 1",
			},
			question2: {
				id: "question2",
				text: "Question 2",
			},
		};

		const action = setQuestions(questions);
		const newState = authReducer(initialState, action);

		expect(newState.questions).toEqual(questions);
	});
});
