import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Weather from './Components/weather.component';
import Form from './Components/form.component';
import { Component } from 'react';

const API_KEY = '1ce43279e9ef5dfa1e8d0feda63998f1'
class App extends Component {
	constructor() {
		super();
		this.state = {
			city: undefined,
			country: undefined,
			icon: undefined,
			main: undefined,
			celsius: undefined,
			temp_max: undefined,
			temp_min: undefined,
			description: undefined,
			error: false,
		};

		this.weatherIcon = {
			ThunderStorm: "wi-thunderstorm",
			Drizzle: "wi-sleet",
			Rain: "wi-storm-showers",
			Snow: "wi-snow",
			Atmosphere: "wi-fog",
			Clear: "wi-day-sunny",
			Clouds: "wi-day-fog",
		};
	}

	getWeatherIcon(icons, rangeId) {
		switch (true) {
			case rangeId >= 200 && rangeId <= 232:
				this.setState({ icon: this.weatherIcon.ThunderStorm });
				break;
			case rangeId >= 300 && rangeId <= 321:
				this.setState({ icon: this.weatherIcon.Drizzle });
				break;
			case rangeId >= 500 && rangeId <= 531:
				this.setState({ icon: this.weatherIcon.Rain });
				break;
			case rangeId >= 701 && rangeId <= 781:
				this.setState({ icon: this.weatherIcon.Atmosphere });
				break;
			case rangeId == 800:
				this.setState({ icon: this.weatherIcon.Clear });
				break;
			case rangeId >= 801 && rangeId <= 804:
				this.setState({ icon: this.weatherIcon.Clouds });
				break;
			default:
				this.setState({ icon: this.weatherIcon.Clear });
		}
	}

	calcCelsius(temp) {
		let cel = Math.floor(temp - 273.15);
		return cel;
	}

	toTitleCase(str) {
		return str.replace(
			/\w\S*/g,
			function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
		);
	}

	getWeather = async (event) => {
		event.preventDefault();
		const city = event.target.elements.city.value;
		const country = event.target.elements.country.value;

		if (city && country) {
			const API_CALL = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
			const response = await API_CALL.json();
			this.setState({
				city: `${response.name}, ${response.sys.country}`,
				celsius: this.calcCelsius(response.main.temp),
				temp_min: this.calcCelsius(response.main.temp_min),
				temp_max: this.calcCelsius(response.main.temp_max),
				description: this.toTitleCase(response.weather[0].description),
			});
			this.getWeatherIcon(this.weatherIcon, response.weather[0].id)
		} else {
			this.setState({ error: true, });
		}
	};

	render() {
		return (
			<div className="App">
				<Form loadWeather={this.getWeather} error={this.state.error} />
				<Weather city={this.state.city} weathericon={this.state.icon} main={this.state.main} celsius={this.state.celsius} temp_min={this.state.temp_min} temp_max={this.state.temp_max} description={this.state.description} error={this.state.error} />
			</div>
		)
	}
};

export default App;
