import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { saveQuestionAnswer } from "../redux/auth";

const PollDetails = ({ questions, users, currentUser, saveQuestionAnswer }) => {
	const { question_id } = useParams();
	const question = questions[question_id];
	//for new question the question Id is not present in the questions object so it will return undefined
	//so we need to handle this case by checking if question_id is present in the questions object or not
	//if not we need to get the question id from the questions object
	const questionId = Object.keys(questions).includes(question_id)
		? question_id
		: Object.keys(questions)[Object.keys(questions).length - 1];

	if (!question) {
		return <p>Question not found.</p>;
	}

	const { author, optionOne, optionTwo } = question;
	const totalVotes = optionOne.votes.length + optionTwo.votes.length;
	const optionOneVotes = optionOne.votes.length;
	const optionTwoVotes = optionTwo.votes.length;
	const optionOnePercentage =
		totalVotes === 0 ? 0 : (optionOneVotes / totalVotes) * 100;
	const optionTwoPercentage =
		totalVotes === 0 ? 0 : (optionTwoVotes / totalVotes) * 100;
	const userVote = users[currentUser].answers[question_id];

	const handleVote = (selectedOption) => {
		console.log("PollDetails output", {
			authedUser: currentUser,
			qid: question_id,
			answer: selectedOption,
		});
		if (!userVote) {
			saveQuestionAnswer({
				authedUser: currentUser,
				qid: questionId,
				answer: selectedOption,
			});
		}
	};

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
				{!userVote && (
					<button onClick={() => handleVote("optionOne")}>Vote</button>
				)}
			</div>
			<div>
				<p>{optionTwo.text}</p>
				<p>
					Votes: {optionTwoVotes} ({optionTwoPercentage.toFixed(2)}%)
					{userVote === "optionTwo" && <span> (Your Vote)</span>}
				</p>
				{!userVote && (
					<button onClick={() => handleVote("optionTwo")}>Vote</button>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	questions: state.auth.questions,
	users: state.auth.users,
	currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	saveQuestionAnswer: ({ authedUser, qid, answer }) =>
		dispatch(saveQuestionAnswer({ authedUser, qid, answer })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PollDetails);
