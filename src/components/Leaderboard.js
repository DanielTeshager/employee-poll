import React from "react";
import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
	const sortedUsers = Object.values(users).sort(
		(a, b) =>
			b.questions.length +
			Object.keys(b.answers).length -
			(a.questions.length + Object.keys(a.answers).length)
	);

	return (
		<div>
			<h2>Leaderboard</h2>
			<ul>
				{sortedUsers.map((user) => (
					<li key={user.id}>
						<p>Name: {user.name}</p>
						<p>Questions asked: {user.questions.length}</p>
						<p>Questions answered: {Object.keys(user.answers).length}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

const mapStateToProps = (state) => ({
	users: state.auth.users,
});

export default connect(mapStateToProps)(Leaderboard);
