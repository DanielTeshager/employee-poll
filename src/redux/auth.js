import {
	_getUsers,
	_getQuestions,
	_saveQuestion,
	_saveQuestionAnswer,
} from "../_DATA";

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

const saveQuestion = (question, author) => ({
	type: "SAVE_QUESTION",
	question,
	author,
});

const saveQuestionAnswer = (authedUser, qid, answer) => ({
	type: "SAVE_QUESTION_ANSWER",
	authedUser,
	qid,
	answer,
});

export {
	setUsers,
	setQuestions,
	login,
	logout,
	saveQuestion,
	saveQuestionAnswer,
};

const initialState = {
	users: {},
	questions: {},
	currentUser: null,
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
			const { question, author } = action;
			return {
				...state,
				questions: {
					...state.questions,
					[question.id]: { ...question, author },
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
