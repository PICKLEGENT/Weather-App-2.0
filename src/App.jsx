import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from './Api';
import {
	FiveDayForecast,
	Footer,
	Forecast,
	ForecastByTime,
	ForecastHighlights,
	Header,
} from './components';

const App = () => {
	const [results, setResults] = useState([]);
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [airPollution, setAirPollution] = useState(null);

	const userLocation = async () => {
		const IP_API = YOUR_IP_API_KEY;

		let userLocationResponse = await fetch(IP_API);
		let userLocationData = await userLocationResponse.json();
		const userLocationArr = userLocationData.loc.split(',');

		const userCurrWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?lat=${userLocationArr[0]}&lon=${userLocationArr[1]}&units=metric&appid=${WEATHER_API_KEY}`
		);
		const userForecastFetch = fetch(
			`${WEATHER_API_URL}/forecast?lat=${userLocationArr[0]}&lon=${userLocationArr[1]}&units=metric&appid=${WEATHER_API_KEY}`
		);
		const userAirPollutionFetch = fetch(
			`${WEATHER_API_URL}/air_pollution/forecast?lat=${userLocationArr[0]}&lon=${userLocationArr[1]}&appid=${WEATHER_API_KEY}`
		);

		Promise.all([
			userCurrWeatherFetch,
			userForecastFetch,
			userAirPollutionFetch,
		])
			.then(async (response) => {
				const weatherResponse = await response[0].json();
				const forecastResponse = await response[1].json();
				const airPollutionResponse = await response[2].json();

				setCurrentWeather({
					city: userLocationData.city + ', ' + userLocationData.country,
					...weatherResponse,
				});
				setForecast({
					city: userLocationData.city + ', ' + userLocationData.country,
					...forecastResponse,
				});
				setAirPollution({
					city: userLocationData.city + ', ' + userLocationData.country,
					...airPollutionResponse,
				});
			})
			.catch(console.log);
	};

	useEffect(() => {
		userLocation();
	}, []);

	const handleOnSearch = (result) => {
		const [lat, lon] = result.value.split(' ');

		const currWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
		);
		const forecastFetch = fetch(
			`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
		);
		const airPollutionFetch = fetch(
			`${WEATHER_API_URL}/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
		);

		Promise.all([currWeatherFetch, forecastFetch, airPollutionFetch])
			.then(async (response) => {
				const weatherResponse = await response[0].json();
				const forecastResponse = await response[1].json();
				const airPollutionResponse = await response[2].json();

				setCurrentWeather({ city: result.label, ...weatherResponse });
				setForecast({ city: result.label, ...forecastResponse });
				setAirPollution({ city: result.label, ...airPollutionResponse });
			})
			.catch(console.log);
		setResults([]);
	};

	return (
		<>
			<Box className='flex flex-col justify-center px-16 py-8 gap-y-8'>
				<Header
					onSearchChange={handleOnSearch}
					userLocation={userLocation}
					data={currentWeather}
					results={results}
					setResults={setResults}
				/>
				<Box className='flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-y-8 lg:gap-x-8'>
					<Box className='flex flex-col gap-y-8'>
						<Forecast data={currentWeather} />
						<Box>
							<FiveDayForecast data={forecast} />
						</Box>
						<Box className='hidden lg:block'>
							<Footer />
						</Box>
					</Box>
					<Box className='flex flex-col gap-y-8'>
						<ForecastHighlights
							data={currentWeather}
							airPollutionData={airPollution}
						/>
						<Box>
							<ForecastByTime
								data={forecast}
								timezoneData={currentWeather ? currentWeather.timezone : null}
							/>
						</Box>
					</Box>
					<Box className='block lg:hidden'>
						<Footer />
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default App;
