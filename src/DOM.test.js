import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "./components/Login";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureStore([]);

describe("Login", () => {
	it("renders the login button and performs click event", () => {
		const store = mockStore({
			auth: {
				currentUser: null,
				users: {
					sarahedo: {
						id: "sarahedo",
						name: "Sarah Edo",
					},
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

		act(() => {
			fireEvent.click(loginButton);
		});
	});
});
