import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../redux/auth";

const Login = ({ users, handleLogin }) => {
	const [selectedUser, setSelectedUser] = useState("");

	const handleUserSelect = (event) => {
		setSelectedUser(event.target.value);
	};

	const handleLoginSubmit = (event) => {
		event.preventDefault();
		if (selectedUser !== "") {
			handleLogin(selectedUser);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLoginSubmit}>
				<label htmlFor="users">Select User</label>
				<select value={selectedUser} onChange={handleUserSelect} id="users">
					<option value="">Select User</option>
					{Object.keys(users).map((userId) => (
						<option key={userId} value={userId}>
							{users[userId].name}
						</option>
					))}
				</select>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	users: state.auth.users,
});

const mapDispatchToProps = (dispatch) => ({
	handleLogin: (userId) => dispatch(login(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
