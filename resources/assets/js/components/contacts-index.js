import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchContacts } from '../actions';

class ContactsIndex extends Component {
	componentDidMount() {
		this.props.fetchContacts();
	}

	fetchContactList() {
		return _.map(this.props.contacts, (item) => {
				return (
					<Link className="col-sm-6 col-md-4 col-lg-3" key={item.id} to={`/contacts/${item.id}`}>
						<div className="card">
							<div className="card-image d-flex justify-content-center">
								<img className="rounded-circle" src="https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg" alt="" />
							</div>
							<div className="card-body">
								<h4 className="card-title">{`${item.first_name} ${item.last_name}`}</h4>
								<div className="card-text">
									<p className="text-muted">{item.email}</p>
									<p className="text-muted">{item.phone}</p>
								</div>
							</div>
						</div>
					</Link>
			);
		});
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							<div className="card-body row">
								<div className="col-sm-12 col-md-9">
									<h2>Contact List</h2>
								</div>
								<div className="col-sm-12 col-md-3">
									<Link to="/contacts/new" className="btn btn-success btn-block">Create Contact</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					{ this.fetchContactList() }
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { contacts: state.contacts }
}


export default connect(mapStateToProps, { fetchContacts })(ContactsIndex);