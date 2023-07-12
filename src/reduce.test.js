import authReducer from "./redux/auth";

describe("auth reducer", () => {
	it("should return the initial state", () => {
		expect(authReducer(undefined, {})).toEqual({
			questions: {},
			currentUser: null,
			users: {},
		});
	});

	// More tests for other actions getUsers

	it("it should list at least one user", () => {
		const initialState = {
			users: {
				sarahedo: {
					id: "sarahedo",
					name: "Sarah Edo",
					avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
					answers: {},
					questions: [],
				},
			},
		};
		const action = {
			type: "SET_USERS",
			users: {
				sarahedo: {
					id: "sarahedo",
					name: "Sarah Edo",
					avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
					answers: {},
					questions: [],
				},
			},
		};
		const newState = authReducer(initialState, action);
		expect(Object.keys(newState.users).length).toBe(1);
	});

	//write another simple test for logout action
	it("it should logout", () => {
		const initialState = {
			currentUser: "sarahedo",
		};
		const action = {
			type: "LOGOUT",
		};
		const newState = authReducer(initialState, action);
		expect(newState.currentUser).toBe(null);
	});

	// More tests for other actions...
	//it should login
	it("it should login", () => {
		const initialState = {
			currentUser: null,
		};
		const action = {
			type: "LOGIN",
			userId: "sarahedo",
		};
		const newState = authReducer(initialState, action);
		expect(newState.currentUser).toBe("sarahedo");
	});
});
