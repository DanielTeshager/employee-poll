import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "./components/Login";

const mockStore = configureStore([]);

describe("Login", () => {
	it("renders the login button and performs click event", () => {
		const store = mockStore({
			auth: {
				currentUser: null,
				users: {},
			},
		});

		render(
			<Provider store={store}>
				<Login />
			</Provider>
		);

		const loginButton = screen.getByRole("button", { name: "Login" });
		expect(loginButton).toBeInTheDocument();

		// Perform click event
		fireEvent.click(loginButton);

		// Expect some change in the UI
		const selectedUser = screen.getByLabelText("Select User");
		expect(selectedUser.value).toEqual("");
	});
});
