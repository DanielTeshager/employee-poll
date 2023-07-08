// auth.js

// Action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Action creators
export const login = (user) => ({
	type: LOGIN,
	user,
});

export const logout = () => ({
	type: LOGOUT,
});

// Reducer
const initialState = {
	currentUser: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				currentUser: action.user,
			};
		case LOGOUT:
			return {
				...state,
				currentUser: null,
			};
		default:
			return state;
	}
};
