// 现在要做登陆功能
// 1.点击登陆按钮，在客户端对数据进行检测 如果通过，就向服务器发送请求，服务器根据邮箱进行排查，有就返回查到了，没有就返回没有查到
// 2.如果不通过，则弹出邮箱或密码不符合格式，
// 3.如果在服务器找到了，就返回true，然后在客户端重新定向到管理页面
// 4.如果没找到，就返回false，然后在客户端弹出邮箱/密码错误
var btn = document.querySelector('.btn');
// 给登陆按钮添加点击事件侦听
btn.addEventListener('click',function(){
    // 对数据进行检测那就要拿到数据
    var getEmailValue = document.getElementById('email').value;
    var getPasswordValue = document.getElementById('password').value;
    // 对输入的值进行排查
    if(getEmailValue.trim().length === 0 || getPasswordValue.trim().length === 0){
        alert('请输入邮箱或密码');
        return
    }
    Ajax({
        url:'http://localhost:3000/admin/login',
        data:{
            email:getEmailValue,
            password:getPasswordValue
        },
        type:'post',
        success:function(result){
            result?location.href = '/admin/manage':alert('请输入正确的邮箱或密码')
        },
        fail:function(xhr){
            console.log(xhr)
        }
    })
},false)