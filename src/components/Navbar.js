import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/auth";

const Navbar = ({ currentUser, handleLogout }) => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/">Dashboard</NavLink>
				</li>
				<li>
					<NavLink to="/add">Add</NavLink>
				</li>
				<li>
					<NavLink to="/leaderboard">Leaderboard</NavLink>
				</li>
				<li>
					<span>Logged in as {currentUser}</span>
				</li>
				<li>
					<button onClick={handleLogout}>Logout</button>
				</li>
			</ul>
		</nav>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	handleLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
