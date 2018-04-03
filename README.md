# homework_upload

## 实现功能
> *  上传doc,zip
> *  按照指定格式命名
> *  正则检查输入的姓名和学号是否满足要求
> *  上传进度提示

## 实现技术

> *  后端用node + express做服务端，实现的文件上传功能；
(http://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/) 成员的Blob，ArrayBuffer，FileReader，FormData，所以不兼容低版本浏览器，建议在移动端上使用。
> *  基于yangli的nodeupload 修改，源码来源于https://github.com/yangyuji/nodeUpload ,感谢原作者的分享。

## 使用方法
> *  git clone https://github.com/yaxian303/homework_upload.git
> *  npm install
> *  node http.js
