$(function () {
   if (!!window.ActiveXObject || "ActiveXObject" in window){//IE 
   alert("请使用谷歌浏览器！"); 
  }
   
    var files = [];
    var ctr = {    
        /**
         * upload
         * @param {Object} file: file.name, file.dataURL
        */
        upload: function (file){
          
             //修改以下filename
           
            var fd = new FormData();
            fd.append('file', file);
            
            $.ajax({
                type: 'POST',
                url: '/upload',
                data: fd,
                processData: false,
                contentType: false,
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total * 100;
                            //在 Chrome DevTool 中限制网速来模拟效果比较好
                            $('.progress-bar').css('width',percentComplete + '%').html(percentComplete + '% Complete');
                        }
                    }, false);
               
                    return xhr;
                }
            }).success(function (res) {
               //对话框弹出上传成功;
               alert(res);
            }).error(function (err) {
                //对话框弹出上传失败;
               alert("上传失败，请重新上传！");
            });
        },


    };

    $('#inputFile').on('change', function (e) {
        var file = e.target.files[0];
        if (file) {
            //只许上传word文件或者压缩文件 
            var fileName=file.name;    
            var fileType = (fileName.substring(fileName.lastIndexOf(".")+1,fileName.length)).toLowerCase();
            

            if (fileType=="doc"||fileType=="docx"||fileType=="rar"||fileType=="zip") {
                var reader = new FileReader();
                //上传文件
                reader.onerror = function () {
                    console.error('reader error');
                };
                files.push(file);

                // 读出文件路径
                reader.readAsDataURL(file);

            } 
        }else {
            throw '请选择有效的文件';
        }
    });

    $('.btn-primary').on('click', function (e) {
        if (files.length === 0) {
            alert('请选择上传文件！');
            return;
        }   
  
      var num=  $('#stuNO').val();
      var name= $('#stuName').val();
      var worknum= $('#workNO').val();
      if(worknum){
            //判断输入是否符合规则
        if(/^\d{11}$/i.test(num)&&/^[\u4e00-\u9fa5]{2,12}$/i.test(name)){
        
            var oriname=files[0].name.split(".");
            //重新命名文件再上传
            var filename=num+"-"+name+"-"+worknum+"."+oriname[1];
            var newfile = new File([files[0]],filename);
            ctr.upload(newfile);
    
        }
        else{
            alert("请查看学号是否输入正确");
        }

      }
      else{
        alert("请选择这是第几次作业");
      }
     
       
      
    });

    
});
