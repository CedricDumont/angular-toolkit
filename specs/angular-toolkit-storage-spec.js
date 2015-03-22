describe('at-storage', function () {
    
    var _storageService ;
    
    beforeEach(module('angular-toolkit-storage'));
    
    beforeEach(inject (function(storage){
        _storageService = storage;
        _storageService.clear();
    }));    

    it('should add value', function(){
        var value = 'test';
        
        _storageService.add('my-key', value);
        
        expect(_storageService.get('my-key')).toBe('test');        
        
    });
    
    it('should be empty', function(){
        var value = 'test';
        
        expect(_storageService.count()).toBe(0);        
        
    });
});