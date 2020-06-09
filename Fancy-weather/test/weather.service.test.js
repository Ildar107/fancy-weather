import { getForecast, getCordForCity, getCityLocalization } from '../src/services/weather.service';

describe('getForecast', () => {

    it('should be defined', () => {
        expect(getForecast(57, 55, 'ru')).toBeDefined();
    });

    it('should return null if latitude or longitude is\'t number', () => {
        return getForecast('57', 55, 'ru').then(x => {
            return expect(x).toBeNull();
        });
    }); 
});

describe('getCordForCity', () => {

    it('should be defined', () => {
        expect(getCordForCity('Ufa', 'ru')).toBeDefined();
    });

    it('should return null if cityName is empty', () => {
        return getCordForCity('', 'ru').then(x => {
            return expect(x).toBeNull();
        });
    }); 
});


describe('getCityLocalization', () => {

    it('should be defined', () => {
        expect(getCityLocalization(57, 55, 'ru')).toBeDefined();
    });

    it('should return empty object if latitude or longitude is\'t number', () => {
        return getCityLocalization('', '', 'ru').then(x => {
            return expect(x).toEqual({});
        });
    }); 
});