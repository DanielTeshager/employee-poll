import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import NewPoll from "./components/NewPoll";
import PollDetails from "./components/PollDetails";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { handleInitialData, login, logout } from "./redux/auth";

const App = ({
	currentUser,
	users,
	handleInitialData,
	handleLogin,
	handleLogout,
}) => {
	useEffect(() => {
		console.log("Inside useEffect");
		handleInitialData();
	}, [handleInitialData]);

	console.log("currentUser:", currentUser);
	console.log("users:", users);

	return (
		<Router>
			<div>
				{currentUser ? (
					<>
						<Navbar currentUser={currentUser} handleLogout={handleLogout} />
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/add" element={<NewPoll />} />
							<Route path="/leaderboard" element={<Leaderboard />} />
							<Route path="/questions/:question_id" element={<PollDetails />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</>
				) : (
					<Login users={users} handleLogin={handleLogin} />
				)}
			</div>
		</Router>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.auth.currentUser,
	users: state.auth.users,
});

const mapDispatchToProps = (dispatch) => ({
	handleInitialData: () => dispatch(handleInitialData()),
	handleLogin: (userId) => dispatch(login(userId)),
	handleLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
