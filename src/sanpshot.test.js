import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Login from "./components/Login";

const mockStore = configureStore();

describe("Login", () => {
	it("renders correctly", () => {
		const initialState = {
			auth: {
				users: {
					sarahedo: {
						id: "sarahedo",
						name: "Sarah Edo",
						avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
						answers: {},
						questions: [],
					},
				},
			},
		};
		const store = mockStore(initialState);

		const tree = renderer
			.create(
				<Provider store={store}>
					<Login />
				</Provider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
