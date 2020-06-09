import { getCityFromIP } from '../src/services/common.service';

describe('getCityFromIP', () => {

    beforeEach(function() {
        global.fetch = jest.fn().mockImplementation(() => {
            const p = new Promise((resolve, reject) => {
              resolve({
                ok: true, 
                Id: '123', 
                json: function() { 
                  return {city: 'Ufa'}
                }
              });
            });
            return p;
        });
      });

    it('should be defined', () => {
        expect(getCityFromIP()).toBeDefined();
    });

    it('should return object with city name', () => {
        return getCityFromIP().then(x => {
            return expect(typeof x.city).toMatch('string')
        });
    }); 
});