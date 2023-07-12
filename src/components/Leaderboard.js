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
						<img
							src={user.avatarURL}
							alt={user.name}
							style={{ width: "50px", height: "50px", borderRadius: "50%" }}
						/>
						<div>
							<h3>{user.name}</h3>
							<p>
								Questions Asked: {user.questions.length}
								<br />
								Questions Answered: {Object.keys(user.answers).length}
							</p>
						</div>
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
