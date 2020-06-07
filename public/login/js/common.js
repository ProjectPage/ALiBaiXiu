(function(){
    var section = document.querySelector('section');
        // 用户信息——导航
        Ajax({
            type:'get',
            url:'/admin/user_mine',
            success:function(result,xhr){
                var nav_list_first = document.querySelector('.nav_list li:first-child');
                result = JSON.parse(result);
                var tem = template('yonghu_xinxi',{result,});
                nav_list_first.innerHTML = tem;
                // nav_list_first.insertAdjacentElement('afterbegin',tem);
                // user_email.value = result.email;
            },
            fail:function(xhr){
                alert('在用户页面获取登录信息错误')
            }
        })
    
    // 导航栏文章动效
    var nav_article = document.querySelector('#nav_article');
    nav_article.onclick = function(e){
        // 获得两个元素的类名有么有指定的值
        var ele_1 = this.nextElementSibling;
        var ele_2 = this.children[0];
        ele_1.classList[1] === 'show_nav_animation' ? (ele_1.classList.remove('show_nav_animation'),ele_1.classList.add('hidden_nav_animation'),ele_2.classList.add('icon-youjiantou'),ele_2.classList.remove('icon-xiajiantou'))
                                                    :(ele_1.classList.add('show_nav_animation'),ele_1.classList.remove('hidden_nav_animation'),ele_2.classList.add('icon-xiajiantou'),ele_2.classList.remove('icon-youjiantou'));
    }
    // 监听导航里文章的点击事件
    var nav = document.querySelector('nav');
    nav.addEventListener('click',function(ev){
        var title_article_write = document.getElementById('title_article_write');
        var title_directory = document.getElementById('title_directory');
        // 所有文章的点击事件
        if(ev.target.id === 'title_article_all'){
            ev.target.classList.add('color_select_article');
            title_article_write.classList.remove('color_select_article');
            title_directory.classList.remove('color_select_article');
            Ajax({
                url:'/admin/article',
                success:function(result,xhr){
                    result = JSON.parse(result);
                    template.defaults.imports.dateformat = dateformat; 
                    var list_article = template('list_article',{result,});
                    section.innerHTML = list_article;
                    function dateformat(date){
                        var reg = /^[\d]{4}-[\d]{2}-[\d]{2}/;
                        return reg.exec(date)[0]
                    }
                },
                fail:function(xhr){
                    alert('获取分类出错')
                }
            })
        }
        // 写文章的点击事件
        if(ev.target.id === 'title_article_write'){
            ev.target.classList.add('color_select_article');
            title_article_all.classList.remove('color_select_article');
            title_directory.classList.remove('color_select_article');
            var tem_article_write = template('section',{});
            section.innerHTML = tem_article_write;
                // 获得分类
            Ajax({
                url:'/admin/get_directory',
                success:function(result,xhr){
                    var tem_directory = template('template_directory',{result:result.result});
                    var tem_author = template('template_author',{id:result.id});
                    var directory_article = document.getElementById('directory_article');
                    var hidden = document.querySelector('.hidden');
                    hidden.innerHTML = tem_author;
                    directory_article.innerHTML = tem_directory;
                },
                fail:function(xhr){
                    alert('获取分类出错')
                }
            })
        }        
    },true)
})()