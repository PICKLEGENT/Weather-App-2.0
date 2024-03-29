import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: false,
    lng:'en',
    resources: {
        en: {
            translation: {
                currLocationBtn: 'Current Location',
                currWeatherHeading: 'Now',
                todaysHighlightsHeading: "Today's Highlights",
                airQualityIndex: 'Air Quality Index',
                sunrise: 'Sunrise',
                sunset: 'Sunset',
                humidity: 'Humidity',
                pressure: 'Pressure',
                visibility: 'Visibility',
                feelsLike: 'Feels Like',
                fiveDayForecastHeading: '5 Day Forecast',
                forecastByTimeHeading: 'Today at',
                author: 'Created by AR23',
                SearchBarPlaceholder: 'Moscow, RU'
            },
        },
        ru: {
            translation: {
                currLocationBtn: 'Мое местоположение',
                currWeatherHeading: 'Погода сейчас',
                todaysHighlightsHeading: 'Основное сегодня',
                airQualityIndex: 'Качество воздуха',
                sunrise: 'Рассвет',
                sunset: 'Закат',
                humidity: 'Влажность',
                pressure: 'Давление',
                visibility: 'Видимость',
                feelsLike: 'Ощущается как',
                fiveDayForecastHeading: 'Прогноз на 5 дней',
                forecastByTimeHeading: 'Сегодня в',
                author: 'Разработано AR23',
                SearchBarPlaceholder: 'Москва, РФ'
            },
        }
    }
})