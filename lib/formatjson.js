module.exports = function(att){

att.register('formatjson', 'format json to beautiful', function(){

  var indent = 4;

  this.help = function(){
    var str = ['Options:',
      ' -s, --silent       无终端提示(No terminal prompt)',
      ' --indent           缩进，默认是4',
      ' --o                输出文件，默认覆盖',
      '',
      'Examples:',
      ' #忽略提示',
      ' att formatjson *.* -s',
      '',
      ' #保存副本',
      ' att formatjson my.json -o my.att.json',
      '',
      ' #缩进',
      ' att formatjson my.json -indent 2'].join("\n").green;

    require('util').puts(str);
  };

  //当在终端中输入`att formatjson *.json`时执行此方法
  this.execute = function(argv, callback){
    //模糊查找文件
    var opts = {
      matchFunction: function(name){
        return name.match(/\.json$/i) && att.file.isFile(name);
      },
      question: function(name){
        return 'format ' + name + '? ';
      }
    }
    if(argv.indent > 0){
        indent = argv.indent;
    }
    if(!argv.o && !argv.output){
      opts.output = function(input){
        return input;
      }
    }
    att.find(argv, this.formatJSON.bind(this), callback, opts);
  }

  //针对单个文件进行操作
  this.formatJSON = function(input, output, callback){
    var content = att.file.read(input);
    var json = JSON.parse(content);
    //格式化
    content = JSON.stringify(json, null, indent);
    att.file.write(output, content);
    callback();
  }

});

}