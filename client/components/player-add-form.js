import React from 'react'
import { Field, reduxForm } from 'redux-form'

let PlayerAddForm = props => {
	const {handleSubmit, pristine, submitting} = props;
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Participant Email</label>
				<Field
					name="email"
					component="input"
					type="email"
					placeholder="Email"
				/>
				<div>
					<button type="submit" disabled={pristine || submitting}>
						Add
					</button>
				</div>
			</form>
		</div>
	)
}

PlayerAddForm = reduxForm({ form: 'playerAddForm' })(PlayerAddForm)

export default PlayerAddForm
