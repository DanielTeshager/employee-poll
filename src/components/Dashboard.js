import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = ({ questions, currentUser }) => {
	const [showAnswered, setShowAnswered] = useState(false);

	const toggleQuestions = () => {
		setShowAnswered(!showAnswered);
	};
	console.log("Dashboard questions", questions);
	const filteredQuestionIds = Object.keys(questions)
		.filter((id) => {
			const question = questions[id];
			return showAnswered
				? question.optionOne.votes.includes(currentUser) ||
						question.optionTwo.votes.includes(currentUser)
				: !(
						question.optionOne.votes.includes(currentUser) ||
						question.optionTwo.votes.includes(currentUser)
				  );
		})
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);
	return (
		<div>
			<h2>Dashboard</h2>
			<p>Welcome, {currentUser}!</p>
			<button onClick={toggleQuestions}>
				Show {showAnswered ? "Unanswered" : "Answered"} Polls
			</button>
			<ul>
				{filteredQuestionIds.map((id) => (
					<li key={id}>
						<Link to={`/questions/${id}`}>
							{questions[id].optionOne.text} or {questions[id].optionTwo.text}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

const mapStateToProps = (state) => ({
	questions: state.auth.questions,
	currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(Dashboard);
