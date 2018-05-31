import React, { Component } from 'react';

class AlertTemplate extends Component {
	render () {
		// the style contains only the margin given as offset
		// options contains all alert given options
		// message is the alert message...
		// close is a function that closes the alert
		const { style, options, message, close } = this.props;

		console.log(style);
		return (
			<div style={style}>
				{options.type === 'info' && '!'}
				{options.type === 'success' && ':)'}
				{options.type === 'error' && ':('}
				{message}
				<button onClick={close}>X</button>
			</div>
		)
	}
}

export default AlertTemplate;
