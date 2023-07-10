import React from "react";
import { connect } from "react-redux";

const Poll = ({ question }) => {
	if (!question) {
		return <p>Question not found.</p>;
	}

	return (
		<div>
			<h3>Would you rather?</h3>
			<p>{question.optionOne.text}</p>
			<p>{question.optionTwo.text}</p>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	const { question_id } = ownProps;
	const { questions } = state.auth;

	return {
		question: questions[question_id],
	};
};

export default connect(mapStateToProps)(Poll);
