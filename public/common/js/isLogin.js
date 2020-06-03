// 怎么拿到这个值呢，首先得顶一一个函数，然后用jsonp的方式来调用这个函数
var script = document.createElement('script');
script.src = '/admin/statu';
console.log(document.documentElement,document);
document.body.insertAdjacentElement('beforebegin',script);
// script.onload = function(){
//     document.documentElement.removeChild(script);
// }