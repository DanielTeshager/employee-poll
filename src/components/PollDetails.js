import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const PollDetails = ({ questions, users, currentUser }) => {
	const { question_id } = useParams();
	const question = questions[question_id];

	if (!question) {
		return <p>Question not found.</p>;
	}

	const { author, optionOne, optionTwo } = question;
	const totalVotes = optionOne.votes.length + optionTwo.votes.length;
	const optionOneVotes = optionOne.votes.length;
	const optionTwoVotes = optionTwo.votes.length;
	const optionOnePercentage = (optionOneVotes / totalVotes) * 100;
	const optionTwoPercentage = (optionTwoVotes / totalVotes) * 100;
	const userVote = optionOne.votes.includes(currentUser)
		? "optionOne"
		: "optionTwo";

	return (
		<div>
			<h2>Would You Rather</h2>
			<p>Posted by: {users[author].name}</p>
			<h3>Options:</h3>
			<div>
				<p>{optionOne.text}</p>
				<p>
					Votes: {optionOneVotes} ({optionOnePercentage.toFixed(2)}%)
					{userVote === "optionOne" && <span> (Your Vote)</span>}
				</p>
			</div>
			<div>
				<p>{optionTwo.text}</p>
				<p>
					Votes: {optionTwoVotes} ({optionTwoPercentage.toFixed(2)}%)
					{userVote === "optionTwo" && <span> (Your Vote)</span>}
				</p>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	questions: state.auth.questions,
	users: state.auth.users,
	currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(PollDetails);
