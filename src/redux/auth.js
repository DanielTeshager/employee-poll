import {
	_getUsers,
	_getQuestions,
	_saveQuestion,
	_saveQuestionAnswer,
	generateUID,
} from "../_DATA";

function formatQuestion({ optionOneText, optionTwoText, author }) {
	return {
		id: generateUID(),
		timestamp: Date.now(),
		author,
		optionOne: {
			votes: [],
			text: optionOneText,
		},
		optionTwo: {
			votes: [],
			text: optionTwoText,
		},
	};
}

const setUsers = (users) => ({
	type: "SET_USERS",
	users,
});

const setQuestions = (questions) => ({
	type: "SET_QUESTIONS",
	questions,
});

const login = (userId) => ({
	type: "LOGIN",
	userId,
});

const logout = () => ({
	type: "LOGOUT",
});

const saveQuestion = (question) => {
	return (dispatch, getState) => {
		const { currentUser } = getState().auth;
		const formattedQuestion = formatQuestion({
			...question,
			author: currentUser,
		});

		return _saveQuestion(formattedQuestion).then(() => {
			dispatch({
				type: "SAVE_QUESTION",
				question: formattedQuestion,
			});
			dispatch(addQuestionToUser(formattedQuestion));
		});
	};
};

const addQuestionToUser = (question) => {
	return {
		type: "ADD_QUESTION_TO_USER",
		question,
	};
};

const saveQuestionAnswer = (authedUser, qid, answer) => {
	return (dispatch) => {
		return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
			dispatch({
				type: "SAVE_QUESTION_ANSWER",
				authedUser,
				qid,
				answer,
			});
		});
	};
};

export {
	setUsers,
	setQuestions,
	login,
	logout,
	saveQuestion,
	saveQuestionAnswer,
};

const initialState = {
	questions: {},
	currentUser: null,
	users: {},
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_USERS":
			return {
				...state,
				users: action.users,
			};
		case "SET_QUESTIONS":
			return {
				...state,
				questions: action.questions,
			};
		case "LOGIN":
			return {
				...state,
				currentUser: action.userId,
			};
		case "LOGOUT":
			return {
				...state,
				currentUser: null,
			};
		case "SAVE_QUESTION":
			const { question } = action;
			return {
				...state,
				questions: {
					...state.questions,
					[question.id]: question,
				},
			};
		case "SAVE_QUESTION_ANSWER":
			const { authedUser, qid, answer } = action;
			return {
				...state,
				users: {
					...state.users,
					[authedUser]: {
						...state.users[authedUser],
						answers: {
							...state.users[authedUser].answers,
							[qid]: answer,
						},
					},
				},
				questions: {
					...state.questions,
					[qid]: {
						...state.questions[qid],
						[answer]: {
							...state.questions[qid][answer],
							votes: state.questions[qid][answer].votes.concat(authedUser),
						},
					},
				},
			};
		case "ADD_QUESTION_TO_USER":
			const { question: newQuestion } = action;
			return {
				...state,
				users: {
					...state.users,
					[newQuestion.author]: {
						...state.users[newQuestion.author],
						questions: state.users[newQuestion.author].questions.concat(
							newQuestion.id
						),
					},
				},
			};
		default:
			return state;
	}
};

export default authReducer;

export const handleInitialData = () => {
	return (dispatch) => {
		Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => {
			dispatch(setUsers(users));
			dispatch(setQuestions(questions));
		});
	};
};
