import React from 'react';
import {render} from 'react-dom';

var $ = require("jquery");

var self;
var owm = {
		'url': 'http://api.openweathermap.org/data/2.5/',
		'call': 'weather',
		'appID': 'af04e81229affb8bde5a951cee8ddd70',
		'city': 'Tucson',
	};
var path = owm.url + owm.call + '?q=' + owm.city + '&APPID=' + owm.appID;

class Weather extends React.Component {

	constructor(props) {
		super(props);
		self = this;
		self.state = {
			description: '',
			temp: '',
			temp_min: '',
			temp_max: '',
			wind_spd: '',
			wind_dir: '',
		};
		self.update();
		self.getWeather();
	}

	update() {
		$.ajax({
			url: path
		}).success(function(data) {
			console.log(data);
			var weather = data.weather[0];
			self.setState({
				description: weather.description,
				temp: self.getTemp(data.main.temp),
				temp_min: self.getTemp(data.main.temp_min),
				temp_max: self.getTemp(data.main.temp_max),
				wind_spd: data.wind.speed + ' m/s',
				wind_dir: data.wind.deg + ' deg',
			});
		}).error(function(err) {
			console.log(err);
		});
	}

	getWeather() {
		setInterval(function() {
			self.update();
		}, 60000);
	}

	getTemp(K) {
		return Math.floor(K * (9/5) - 459.67) + '\u00B0 F';
	}

	render() {
		return (
			<div className="weather">
				<div className="weather-left">
					<span className="fa fa-cloud" />
					<p><i>{ self.state.description }</i></p>
					<p>wind: { self.state.wind_spd }</p>
				</div>
				<div className="weather-right">
					<h1>{ self.state.temp }</h1>
					<h5>{ self.state.temp_min } | { self.state.temp_max }</h5>
				</div>
			</div>
		);
	}

}

render(<Weather/>, document.getElementById('weather'));
