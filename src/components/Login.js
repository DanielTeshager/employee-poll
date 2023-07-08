import React, { useState } from "react";

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
				<select value={selectedUser} onChange={handleUserSelect}>
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

export default Login;
