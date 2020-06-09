import getConvertTemp from '../src/helpers/getConvertTemp';
import getLocalDate from '../src/helpers/getLocalDate';
import getSeason from '../src/helpers/getSeason';
import searchWeatherIcon from '../src/helpers/searchWeatherIcon';

describe('getConvertTemp', () => {

    it('should be defined', () => {
        expect(getConvertTemp(true, 30)).toBeDefined();
    });

    it('should return NaN if type isn\'t number', () => {
        expect(getConvertTemp(true, '30')).toBeNaN();
    });

    it('should return correct fahrenheit value from celsius', () => {
        expect(getConvertTemp(true, 30)).toBe(86);
        expect(getConvertTemp(true, 0)).toBe(32);
    });

    it('should return correct celsius value from fahrenheit', () => {
        expect(getConvertTemp(false, 86)).toBe(30);
        expect(getConvertTemp(false, 0)).toBeCloseTo(-17.7778, 4);
    })
});

describe('getLocalDate', () => {

    it('should be defined', () => {
        expect(getLocalDate(new Date())).toBeDefined();
    });

    it('should return same date for empty timezone', () => {
        const currentDate = new Date();
        expect(getLocalDate(currentDate, '').toString()).toBe(currentDate.toString());
    });

    it('should return correct date for timezone', () => {
        const currentDate = new Date();
        const expectedDate = new Date(new Date(currentDate.toUTCString()).toLocaleString(
            'en-US', { timeZone: 'America/New_York' },
          ));
        expect(getLocalDate(currentDate, 'America/New_York').toString()).toBe(expectedDate.toString());
    });
});

describe('getSeason', () => {

    it('should be defined', () => {
        expect(getSeason(new Date())).toBeDefined();
    });

    it('should return winter for bad date or null/undefined', () => {
        expect(getSeason(Date.parse('ewqeqwe'))).toBe('winter');
        expect(getSeason()).toBe('winter');
    });

    it('should return winter for 0,1,12 month', () => {
        const winter = new Date();
        winter.setMonth(0);
        expect(getSeason(winter)).toBe('winter');
        winter.setMonth(1);
        expect(getSeason(winter)).toBe('winter');
        winter.setMonth(12);
        expect(getSeason(winter)).toBe('winter');
    });

    it('should return spring for 2,3,4 month', () => {
        const spring = new Date();
        spring.setMonth(2);
        expect(getSeason(spring)).toBe('spring');
        spring.setMonth(3);
        expect(getSeason(spring)).toBe('spring');
        spring.setMonth(4);
        expect(getSeason(spring)).toBe('spring');
    });

    it('should return summer for 5,6,7 month', () => {
        const summer = new Date();
        summer.setMonth(5);
        expect(getSeason(summer)).toBe('summer');
        summer.setMonth(6);
        expect(getSeason(summer)).toBe('summer');
        summer.setMonth(7);
        expect(getSeason(summer)).toBe('summer');
    });

    it('should return fall for 8,9,10 month', () => {
        const fall = new Date();
        fall.setMonth(8);
        expect(getSeason(fall)).toBe('fall');
        fall.setMonth(9);
        expect(getSeason(fall)).toBe('fall');
        fall.setMonth(10);
        expect(getSeason(fall)).toBe('fall');
    });
});

describe('searchWeatherIcon', () => {

    it('should be defined', () => {
        expect(searchWeatherIcon(500, new Date())).toBeDefined();
    });

    it('should return string', () => {
        expect(typeof searchWeatherIcon(500, new Date())).toBe('string');
    });

    it('should return empty string for wrong id', () => {
        expect(searchWeatherIcon(1, new Date())).toBe('');
    });
});