(function(){
    // 当前登录用户
    var user_email = document.querySelector('#user_email');
    // 导航用户信息
    Ajax({
        type:'get',
        url:'/admin/user_mine',
        success:function(result,xhr){
            var nav_list_first = document.querySelector('.nav_list li:first-child');
            result = JSON.parse(result);
            var tem = template('yonghu_xinxi',{result,});
            nav_list_first.innerHTML = tem;
            // nav_list_first.insertAdjacentElement('afterbegin',tem);
            console.log(tem,result);
            user_email.value = result.email;
        },
        fail:function(xhr){
            alert('在用户页面获取登录信息错误')
        }
    })
    // 现在要在仪表盘里更新总共的数据多收
    Ajax({
        url:'/admin/overview',
        success:function(result){
            result = JSON.parse(result);
            var tem_overview = template('template_overview',result);
            var content_statistics = document.querySelector('.content_statistics');
            content_statistics.innerHTML = tem_overview;
            console.log(result,tem_overview)
        },
        fail:function(){
            alert('获取数据统计出错')
        }
    })

    // 1.得获得那个元素
    // 2.给这个元素添加点击事件
    // 3.通过点击给这个元素添加动画类  这个类得有两个，一个出现 一个消失
})()

// 现在要做的是分类目录
// 1.静态页面    选中的是高亮文字，同时文章也是高亮的，在主体上变化，头部和导航基本不变，所以说这是一个难题
//     这个页面和用户页面极为类似，就把用户页面拷贝过来进行修改基本可以了
//     所以完成是这样的
//         1.拷贝用户页面，引入相对应的文件
//         2.对一些需要修改的地方进行修改补缺
// 2.分析需要什么东西
// 3.填写分类信息，将分类添加到数据库