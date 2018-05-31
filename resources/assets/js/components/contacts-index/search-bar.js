import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
	onSubmit(event) {
		event.preventDefault();
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="card">
						<div className="card-body">
							<form onSubmit={this.onSubmit.bind(this)}>
								<div className="form-group row">
									<div className="input-group col-sm-12 col-md-9">
										<input type="text" className="form-control" placeholder="Search" />
										<span className="input-group-append">
											<button type="button" className="btn btn-effect-ripple btn-primary"><i className="fa fa-search"></i></button>
										</span>
									</div>
									<div className="col-sm-12 col-md-3">
										<Link to="/contacts/new" className="btn btn-success btn-block">Create Contact</Link>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchBar;