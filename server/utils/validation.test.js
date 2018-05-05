var expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var str = 23134;
        var result = isRealString(str);

        expect(result).toBeFalsy();
    });
    
    it('should reject string with only spaces', () => {
        var str = '    ';
        var result = isRealString(str);

        expect(result).toBeFalsy();
    });

    
    it('should allow string with non-space characters', () => {
        var str = '   Stefano   ';
        var result = isRealString(str);

        expect(result).toBeTruthy();
    });
});