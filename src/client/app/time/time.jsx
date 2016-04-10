import React from 'react';
import {render} from 'react-dom';
import moment from 'moment';

var self;

class Time extends React.Component {

	constructor(props) {
		super(props);
		self = this;
		self.state = {
			now: moment().format("h:mm A"),
			today: moment().format("dddd, MMM D YYYY")
		};
		self.checkTime();
	}

	checkTime() {
		setInterval(function() {
			let newTime = moment().format("h:mm A");
			self.setState({ now: newTime });
			let newDate = moment().format("dddd, MMM D YYYY");
			self.setState({ today: newDate });
		}, 1000);
	}

	render() {
		return (
			<div>
				<h1>{ self.state.now }</h1>
				<h5>{ self.state.today }</h5>
			</div>
		);
	}

}

render(<Time/>, document.getElementById('time'));
