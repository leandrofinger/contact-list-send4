import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchContact, deleteContact } from '../actions';

class ContactsShow extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchContact(id);
	}

	onDeleteClick() {
		const { id } = this.props.match.params;
		this.props.deleteContact(id, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { contact } = this.props;

		if (!contact) {
			return (
				<div>Loading...</div>
			);
		}

		return (
			<div className="card">
				<div className="card-header">
					<h3>Contact Detail</h3>
				</div>
				<div className="card-body row">
					<div className="card-image col-md-3 col-sm-6 col-xs-12">
						<img className="rounded-circle" src="https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg" alt="" />
					</div>
					<div className="col-md-9 col-sm-6 col-xs-12">
						<dl style={{'margin-top': '20px'}}>
							<dt>Name:</dt>
							<dd>{ `${contact.first_name} ${contact.last_name}` }</dd>
							<dt>Email</dt>
							<dd>{ contact.email }</dd>
							<dt>Phone</dt>
							<dd>{ contact.phone }</dd>
						</dl>
						<Link to="/" className="btn btn-link">Back to index</Link>
						<Link to={`/contacts/edit/${contact.id}`} className="btn btn-light">Edit</Link>
						<button
						className="btn btn-danger"
						onClick={this.onDeleteClick.bind(this)}>Delete</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ contacts }, ownProps) {
	return { contact: contacts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchContact, deleteContact })(ContactsShow);