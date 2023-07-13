import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "./components/Login";
import userEvent from "@testing-library/user-event";

const mockStore = configureStore([]);

describe("Login", () => {
	it("renders the login button and performs click event", async () => {
		const store = mockStore({
			auth: {
				currentUser: null,
				users: {
					sarahedo: {
						id: "sarahedo",
						name: "Sarah Edo",
						// ... other user properties
					},
					// ... other users
				},
			},
		});

		render(
			<Provider store={store}>
				<Login />
			</Provider>
		);

		const loginButton = screen.getByRole("button", { name: "Login" });
		expect(loginButton).toBeInTheDocument();

		// Select a user
		await act(async () => {
			userEvent.selectOptions(screen.getByLabelText("Select User"), [
				"sarahedo",
			]);
		});

		// Perform click event
		await act(async () => {
			fireEvent.click(loginButton);
		});

		// Expect some change in the UI
		const selectedUser = screen.getByLabelText("Select User");
		expect(selectedUser.value).toEqual("sarahedo");
	});
});
