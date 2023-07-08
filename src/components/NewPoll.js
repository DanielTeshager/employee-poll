import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPoll = ({ addPoll }) => {
	const [option1, setOption1] = useState("");
	const [option2, setOption2] = useState("");
	const navigate = useNavigate();

	const handleOption1Change = (event) => {
		setOption1(event.target.value);
	};

	const handleOption2Change = (event) => {
		setOption2(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// Create new poll object
		const poll = {
			question: "Would you rather:",
			option1,
			option2,
		};

		// Call addPoll function to add the new poll
		addPoll(poll);

		// Redirect to home page after form submission
		navigate("/");
	};

	return (
		<div>
			<h2>Create a New Poll</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<p>Would you rather:</p>
				</div>
				<div>
					<label htmlFor="option1">Option 1: </label>
					<input
						type="text"
						id="option1"
						value={option1}
						onChange={handleOption1Change}
					/>
				</div>
				<div>
					<label htmlFor="option2">Option 2: </label>
					<input
						type="text"
						id="option2"
						value={option2}
						onChange={handleOption2Change}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default NewPoll;
