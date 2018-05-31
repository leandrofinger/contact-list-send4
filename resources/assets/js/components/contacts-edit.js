import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm, initialize } from 'redux-form';
import { withAlert } from 'react-alert';
import { compose } from 'redux';

import { fetchContact, updateContact } from '../actions';

class ContactsEdit extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchContact(id);
	}

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
		console.log(values);
		this.props.updateContact(values, () => {
			this.props.history.push(`/contact/${values.id}`);
			this.props.alert.success('Contact has been updated!');
		});
	}

	render() {
		const { contact, handleSubmit, submitting } = this.props;

		if (!contact) {
			return (
				<div>Loading...</div>
			)
		}

		return (
			<div className="card">
				<div className="card-header">
					<h3>Edit Contact</h3>
				</div>
				<div className="card-body">
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<input type="hidden" name="id" value={contact.id}/>
						<Field name="first_name" label="Name"
									 component={this.renderField} value={contact.first_name} required />
						<Field name="last_name" label="Last name"
									 component={this.renderField} value={contact.last_name} required />
						<Field name="email" label="Email"
									 component={this.renderField} value={contact.email} required />
						<Field name="phone" label="Phone number"
									 component={this.renderField} value={contact.phone} required />
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

function mapStateToProps({ contacts }, ownProps) {
	const contact = contacts[ownProps.match.params.id];
	return {
		contact,
		initialValues: contact
	};
}

ContactsEdit = reduxForm({
	form: 'ContactsEditForm',
	validate
})(ContactsEdit);

ContactsEdit = connect(mapStateToProps, { fetchContact, updateContact })(ContactsEdit);

export default ContactsEdit;
