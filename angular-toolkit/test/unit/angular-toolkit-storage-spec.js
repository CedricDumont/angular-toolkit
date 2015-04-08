/* jshint ignore:start */
describe('at-storage', function () {
    
    var _storageService ;
    
    //beforeEach(module('angular-toolkit-storage'));
    
    beforeEach(function(){
        module('angular-toolkit-storage');
    });
    
    beforeEach(inject (function(storage){
        _storageService = storage;
        _storageService.clear();
    }));    

    it('should add value', function(){
        var value = 'test';
        
        _storageService.add('my-key', value);
        
        expect(_storageService.get('my-key')).toBe('test');        
        
    });
    
    it('should refresh existing value', function(){
        var value = 'test';
        var value2 = 'test2';
        var myKey ='uniqueKey';
        
        _storageService.add(myKey, value);
        
        expect(_storageService.get(myKey)).toBe(value); 
        
        _storageService.add(myKey, value2);
        
        expect(_storageService.get(myKey)).toBe(value2); 
        
        expect(_storageService.count()).toBe(1);   
        
    });
    
    it('should be empty', function(){
        var value = 'test';
        
        expect(_storageService.count()).toBe(0);        
        
    });
});
/* jshint ignore:end */