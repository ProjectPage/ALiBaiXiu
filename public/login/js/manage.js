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
    // 导航栏文章动效
    var list_nav_article = document.querySelector('.list_nav_article');
    list_nav_article.onclick = function(e){
        // 获得两个元素的类名有么有指定的值
        var ele_1 = this.lastElementChild;
        var ele_2 = this.children[0].children[0];
        ele_1.classList[1] === 'show_nav_animation' ? (ele_1.classList.remove('show_nav_animation'),ele_1.classList.add('hidden_nav_animation'),ele_2.classList.add('icon-youjiantou'),ele_2.classList.remove('icon-xiajiantou'))
                                                    :(ele_1.classList.add('show_nav_animation'),ele_1.classList.remove('hidden_nav_animation'),ele_2.classList.add('icon-xiajiantou'),ele_2.classList.remove('icon-youjiantou'));
        // this.lastElementChild.classList.add('show_nav_animation');
        function hasClass(){

        }
    }
    // 1.得获得那个元素
    // 2.给这个元素添加点击事件
    // 3.通过点击给这个元素添加动画类  这个类得有两个，一个出现 一个消失
})()