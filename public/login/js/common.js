(function(){
    // 给模板定义全局变量
    template.defaults.imports.dateformat = dateformat; 
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
                    var list_article = template('list_article',{result,});
                    section.innerHTML = list_article;
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
        // 评论的点击事件
        if(ev.target.id === 'comment'){
            // 一些逻辑上的动效
            // 当前元素添加，其他的元素删除
            // 哪些元素添加，哪些元素删除
            // var select_nav = document.querySelectorAll('.select_nav');
            // select_nav.forEach(function(v){
            //     v.classList.remove('select_nav');
            // })
            // ev.target.classList.add('select_nav');
            kk({
                remove:['select_nav','color_select_article'],
                add:['select_nav','color_select_article'],
                target:ev.target
            })
            // var color_select_article = document.querySelectorAll('.color_select_article');
            // color_select_article.forEach(function(v){
            //     v.classList.remove('color_select_article');
            // })
            // ev.target.classList.add('color_select_article');
            var show_nav_animation = document.querySelectorAll('.show_nav_animation');
            show_nav_animation.forEach(function(v){
                v.classList.remove('show_nav_animation');
                v.classList.add('hidden_nav_animation')
            })
            var xiajiantou = document.getElementById('nav_article').children[0];
            xiajiantou.classList[1] === 'icon-xiajiantou' ? (xiajiantou.classList.remove('icon-xiajiantou'),xiajiantou.classList.add('icon-youjiantou')):'';
            // 就得渲染模板了
            Ajax({
                url:'/admin/comment',
                success:function(result){
                    result = JSON.parse(result);
                    console.log(result);
                    var tem_comment = template('template_list_comment',{result,});
                    section.innerHTML = tem_comment
                },
                fail:function(){
                    alert('获取评论失败')
                }
            })
        }
        // 仪表盘的点击事件
        if(ev.target.id === 'nav_yibiaopan'){
            // alert(11)
        }  
        
        // 我是要选中在某个区域带有某个类名的一些元素，然后将这些元素的类名都删除
        // 给定某个类名。给指定的元素添加，一般是事件对象本身
        function kk(obj){
            // obj = {
            //     remove:[],
            //     add:'添加',
            //     target:'添加类名的元素'
            // }            
            var arr = [];
            // 拿到需要删除类名的元素
            obj.remove.forEach(function(v){
                arr.push(document.querySelectorAll(`.${v}`) || document.querySelectorAll(`#${v}`));
            })
            // 删除类名
            for(let i = 0 ;i < arr.length;i++){
                for(let y = 0;y<arr[i].length;y++){
                    arr[i][y].classList.remove(obj.remove[i])
                }
            }
            // 添加类名
            obj.add.forEach(function(v){
                obj.target.classList.add(v);
            })
        }
    },true)







    function dateformat(date){
        var reg = /^[\d]{4}-[\d]{2}-[\d]{2}/;
        return reg.exec(date)[0]
    }
})()