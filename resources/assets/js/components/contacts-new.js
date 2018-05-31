import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withAlert } from 'react-alert';
import { compose } from 'redux';

import { createContact } from '../actions';

class ContactsNew extends Component {
	renderField(field, type = "text") {
		const { meta: {touched, error} } = field;
		const groupClassName = `form-group ${touched && error ? 'has-danger' : ''}`;
		const inputClassName = `form-control ${touched && error ? 'is-invalid' : ''}`;

		return (
			<div className={groupClassName}>
				<label htmlFor={field.input.name}>{field.label}</label>
				<input
					className={inputClassName}
					type={type}
					id={field.input.name}
					{...field.input} />
				<div className="invalid-feedback">
					{ (touched) ? <span>{error}</span> : '' }
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createContact(values, () => {
			this.props.history.push('/');
			this.props.alert.success('Contact has been created!');
		});
	}

	render() {
		const { handleSubmit, submitting } = this.props;

		return (
			<div className="card">
				<div className="card-header">
					<h3>New Contact</h3>
				</div>
				<div className="card-body">
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<Field name="first_name" label="Name"
									 component={this.renderField} required />
						<Field name="last_name" label="Last name"
									 component={this.renderField} required />
						<Field name="email" label="Email"
									 component={this.renderField} required />
						<Field name="phone" label="Phone number"
									 component={this.renderField} required />
						<div className="form-group">
							<button type="submit" disabled={submitting} className="btn btn-primary">Submit</button>
							<Link className="btn btn-link" to="/">cancel</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};

	if (!values.name) {
		errors.name = "Please enter a name";
	}
	if (!values.last_name) {
		errors.last_name = "Please enter a last name";
	}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[^.][A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}
	if (!values.phone) {
		errors.phone = "Please enter a phone number";
	}

	return errors;
};

export default reduxForm({
	form: 'ContactsNewForm',
	validate
})(
	compose(withAlert, connect(null, { createContact }))(ContactsNew)
);
