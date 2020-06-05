// 退出登录模块
// 1.给这个退出按钮添加点击事件an
(function(){
    var exit = document.querySelector('.exit');
    exit.addEventListener('click',function(ev){
        var isConfirm = confirm('您确定要退出吗');
        if(isConfirm){
            Ajax({
                url:'http://localhost:3000/admin/logout',
                success:function(result,xhr){
                    result?location.href = '/admin/login':''
                },
                fail:function(xhr){
                    alert('请求出错')
                }
            })
        }
    },false)
})()

// 2.弹出确认框，点击确认发送Ajax请求
// 3.点取消就就什么也不做