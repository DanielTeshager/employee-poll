import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser, handleLogout }) => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Dashboard</Link>
				</li>
				<li>
					<Link to="/newpoll">New Poll</Link>
				</li>
				<li>
					<Link to="/leaderboard">Leaderboard</Link>
				</li>
				<li>{currentUser && <span>Welcome, {currentUser.name}!</span>}</li>
				<li>
					<button onClick={handleLogout}>Logout</button>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
