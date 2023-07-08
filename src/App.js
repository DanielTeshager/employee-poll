import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import NewPoll from "./components/NewPoll";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import { _getUsers } from "./_DATA";

const App = () => {
	const [users, setUsers] = useState({});
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const usersData = await _getUsers();
		setUsers(usersData);
	};

	const handleLogin = (userId) => {
		setCurrentUser(userId);
	};

	const handleLogout = () => {
		setCurrentUser(null);
	};

	return (
		<Router>
			<div>
				{currentUser ? (
					<>
						<Navbar currentUser={currentUser} handleLogout={handleLogout} />
						<Routes>
							<Route
								path="/"
								element={<Dashboard currentUser={currentUser} />}
							/>
							<Route
								path="/newpoll"
								element={<NewPoll currentUser={currentUser} />}
							/>
							<Route path="/leaderboard" element={<Leaderboard />} />
						</Routes>
					</>
				) : (
					<Login users={users} handleLogin={handleLogin} />
				)}
			</div>
		</Router>
	);
};

export default App;
