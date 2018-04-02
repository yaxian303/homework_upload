'use strict';

var express = require('express')
  , path = require('path')
  , app = express()
  , logger = require('morgan')
  , multer  = require('multer');



app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'www')));
app.set('views', path.join(__dirname, 'www'));


/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index', { title: '上传作业' });
});


/* config the multer storage */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './www/homeworkfiles')//设置存储地址
    },
    
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        var myDate = new Date();//加上时间戳的文件名
        var time=(myDate.getMonth()+1)+"月"+myDate.getDate()+"日"+myDate.getHours()+"时"+myDate.getMinutes()+"分"; //获取当前小时数(0-23)
        cb(null, fileFormat[0] +"-"+ time + "." + fileFormat[1]);
    }
});

var upload = multer({storage: storage});

//接受上传参数
app.post('/upload', upload.single('file'), function(req, res) {  
    if (req.file) {
   
        res.send("祁老师收到你的作业了。");
        console.log(req.file);
    }
});

app.listen(80, function() {
    console.log('Server start on :' + '80');
});