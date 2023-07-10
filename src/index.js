import { createRoot } from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./redux/auth";
import App from "./App";

// Combine reducers
const rootReducer = combineReducers({
	auth: authReducer,
});

// Create the Redux store with the combined reducers and apply middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
