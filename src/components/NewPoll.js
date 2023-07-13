import React, { useState } from "react";
import { connect } from "react-redux";
import { saveQuestion } from "../redux/auth";
import { useNavigate } from "react-router-dom";

const NewPoll = ({ currentUser, saveQuestion }) => {
	const [optionOneText, setOptionOne] = useState("");
	const [optionTwoText, setOptionTwo] = useState("");
	const navigate = useNavigate();

	const handleOptionOneChange = (event) => {
		setOptionOne(event.target.value);
	};

	const handleOptionTwoChange = (event) => {
		setOptionTwo(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (optionOneText.trim() === "" || optionTwoText.trim() === "") {
			// Handle the case when one or both options are empty
			return;
		}

		const question = {
			optionOne: {
				text: optionOneText,
				votes: [],
			},
			optionTwo: {
				text: optionTwoText,
				votes: [],
			},
			author: currentUser,
		};

		console.log(question);

		saveQuestion(question);

		// Reset the form
		setOptionOne("");
		setOptionTwo("");

		// Navigate to Dashboard
		navigate("/");
	};

	return (
		<div>
			<h2>Create a New Poll</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Option One:
					<input
						type="text"
						value={optionOneText}
						onChange={handleOptionOneChange}
					/>
				</label>
				<br />
				<label>
					Option Two:
					<input
						type="text"
						value={optionTwoText}
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
