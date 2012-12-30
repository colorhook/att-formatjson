var formatjson = process.env.JSCOV ? require('../lib-cov/formatjson') : require('../lib/formatjson');
var fs = require('fs');
var fileutil = require('fileutil');

describe('formatjson is a att plugin', function(){
    
  var att = {
        find: function(argv, iterator, callback, options){
            iterator();
            callback();
        },
        fileutil: fileutil
    }

  it('formatjson is function, and instance has execute function', function(done){
    formatjson.should.be.a('function');

    var plugin = new formatjson(att);

    plugin.name.should.equal('formatjson');
    plugin.execute.should.be.a('function');
    plugin.formatJSON.should.be.a('function');

    var json = JSON.stringify({a: 1});
    var f = __dirname + '/mock.json';
    fileutil.write(f, json);
    plugin.formatJSON(f, f, function(){
        var json2 = fileutil.read(f);
        json2.should.equal(JSON.stringify({a: 1}, null, 4));
        fileutil.delete(f);
        done();
    });
  });



});