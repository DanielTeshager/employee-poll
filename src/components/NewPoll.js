import React, { useState } from "react";
import { connect } from "react-redux";
import { saveQuestion } from "../redux/auth";

const NewPoll = ({ currentUser, saveQuestion }) => {
	const [optionOne, setOptionOne] = useState("");
	const [optionTwo, setOptionTwo] = useState("");

	const handleOptionOneChange = (event) => {
		setOptionOne(event.target.value);
	};

	const handleOptionTwoChange = (event) => {
		setOptionTwo(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (optionOne.trim() === "" || optionTwo.trim() === "") {
			// Handle the case when one or both options are empty
			return;
		}

		const question = {
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: currentUser,
		};

		console.log(question);

		saveQuestion(question);

		// Reset the form
		setOptionOne("");
		setOptionTwo("");
	};

	return (
		<div>
			<h2>Create a New Poll</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Option One:
					<input
						type="text"
						value={optionOne}
						onChange={handleOptionOneChange}
					/>
				</label>
				<br />
				<label>
					Option Two:
					<input
						type="text"
						value={optionTwo}
						onChange={handleOptionTwoChange}
					/>
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	saveQuestion: (question) => dispatch(saveQuestion(question)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll);
