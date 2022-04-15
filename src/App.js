import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Weather from './Components/weather';
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
		}
		this.getWeather();

		this.weathericon = {
			ThunderStorm: "wi-thunderstorm",
			Drizzle: "wi-sleet",
			Rain: "wi-storm-showers",
			Snow: "wi-snow",
			Atmosphere: "wi-fog",
			Clear: "wi-day-sunny",
			Clouds: "wi-day-fog",
		}
	}

	getWeatherIcon(icons, rangeId) {
		switch (true) {
			case rangeId >= 200 && rangeId <= 232:
				this.setState({ icon: this.weathericon.ThunderStorm });
				break;
			case rangeId >= 300 && rangeId <= 321:
				this.setState({ icon: this.weathericon.Drizzle });
				break;
			case rangeId >= 500 && rangeId <= 531:
				this.setState({ icon: this.weathericon.Rain });
				break;
			case rangeId >= 701 && rangeId <= 781:
				this.setState({ icon: this.weathericon.Atmosphere });
				break;
			case rangeId == 800:
				this.setState({ icon: this.weathericon.Clear });
				break;
			case rangeId >= 801 && rangeId <= 804:
				this.setState({ icon: this.weathericon.Clouds });
				break;
			default:
				this.setState({ icon: this.weathericon.Clear });
		}
	}

	calcCelsius(temp) {
		let cel = Math.floor(temp - 273.15);
		return cel;
	}

	getWeather = async () => {
		const API_CALL = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`)
		const response = await API_CALL.json();
		this.setState({
			city: response.name,
			country: response.sys.country,
			icon: this.getWeatherIcon(this.weathericon, response.weather[0].id),
			celsius: this.calcCelsius(response.main.temp),
			temp_min: this.calcCelsius(response.main.temp_min),
			temp_max: this.calcCelsius(response.main.temp_max),
			description: response.weather[0].description,
		})
	};

	state = {}
	render() {
		return (
			<div className="App">
				<Weather city={this.state.city} country={this.state.country} weathericon={this.state.icon} main={this.state.main} celsius={this.state.celsius} temp_min={this.state.temp_min} temp_max={this.state.temp_max} description={this.state.description} error={this.state.error} />
			</div>
		)
	}
};

export default App;
