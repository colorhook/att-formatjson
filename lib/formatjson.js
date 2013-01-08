module.exports = function(att){
    
  var indent = 4;

  //att下面的fileutil对象，用于文件同步操作
  var fileutil = att.fileutil;

  //定义插件名称
  this.name = 'formatjson';

  //定义插件描述
  this.description = '格式化json';

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
        return name.match(/\.json$/i) && fileutil.isFile(name);
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
    var content = fileutil.read(input);
    var json = JSON.parse(content);
    //格式化
    content = JSON.stringify(json, null, indent);
    fileutil.write(output, content);
    callback();
  }
}