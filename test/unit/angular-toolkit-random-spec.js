/* jshint ignore:start */
describe('at-random spec ', function () {

    var _UUID;

    beforeEach(module('angular-toolkit-random'));

    beforeEach(inject(function (UUID) {
        _UUID = UUID;

    }));


    it('should generate a random value', function () {
        var random_number = _UUID.newUUID();

        expect(random_number).toBeDefined();
        expect(random_number.length).toBe(36);
        expect(_UUID.newUUID()).not.toBe(_UUID.newUUID());

    });


});
/* jshint ignore:end */