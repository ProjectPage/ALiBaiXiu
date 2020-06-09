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
    var setting_nav = document.querySelector('#setting_nav');
    setting_nav.onclick = function(e){
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
        var title_article_all = document.getElementById('title_article_all');
        // 所有文章的点击事件
        if(ev.target.id === 'title_article_all'){
            kk({
                remove:['color_select_article','select_nav'],
                add:['color_select_article'],
                target:ev.target
            })
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
            kk({
                remove:['select_nav','color_select_article'],
                add:['select_nav','color_select_article'],
                target:ev.target
            })
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
        // 图片轮播的点击事件
        if(ev.target.id === 'setting_slides'){
            Ajax({
                url:'/admin/slides',
                success:function(result){
                    result = JSON.parse(result);            
                    var tem = template('template_slides',{result,});
                    section.innerHTML = tem;
                },
                fail:function(){
                    alert('获取图片轮播出错')
                }
            })

            // 现在要做的是添加轮播信息/
            // 1.首先给文件添加改变事件，将路径发送到服务器，服务器返回处理的数据
            // 2.客户端拿到数据，将数据添加到隐藏于众
            // 3.填写信息
            // 4.点击提交。，验证复合型
            // 5.发送ajax请求，将数据田家达哦数据库
            // 6.返回true/false
            // 7.更新轮播的数据
            // 发送A系啊想请求
            // 服务器返回i查到的数据
            // 客户端将数据和模板进行拼接后放入页面中
        }
        // 网站设置的点击事件
        if(ev.target.id === 'setting_www'){
            Ajax({
                url:'/admin/setting',
                success:function(result){
                    console.log(result);
                    var tem = template('template_setting',{result:result[0]});
                    section.innerHTML = tem
                },
                fail:function(){
                    alert('获取设置参数错误')
                }
            })
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
    },false)
    section.addEventListener('change',function(ev){
        // 封面
        if(ev.target.id === 'cover_article'){
            var cover_article = document.getElementById('cover_article');
            // cover_article.value = ev.target.files[0]
        }
        // 轮播图
        if(ev.target.id === 'image_slides'){
            if(ev.target.files[0].type !== 'image/jpeg'){
                alert('请选择图片，不要皮');
                return false
            }
            var formData = new FormData();
            console.log(ev.target.files);
            formData.append('touxiang_img',ev.target.files[0]);
            var xhr = new XMLHttpRequest();
            xhr.open('post','/admin/upload');
            xhr.onload = function(){
                if(xhr.status === 200){
                    var src_img = document.querySelector('.src_img');
                    src_img.value = xhr.responseText                    
                }
                else{
                    alert('轮播图上传出错')
                }

            }
            xhr.send(formData);
        }
        // 网站图标
        if(ev.target.id === 'icon_www'){
            if(ev.target.files[0].type !== 'image/jpeg'){
                alert('请选择图片，不要皮');
                return false
            }
            var formData = new FormData();
            formData.append('touxiang_img',ev.target.files[0]);
            var xhr = new XMLHttpRequest();
            xhr.open('post','/admin/upload');
            xhr.onload = function(){
                if(xhr.status === 200){
                    var icon = document.querySelector('.icon');
                    document.querySelector('.img_icon').src = xhr.responseText;
                    icon.value = xhr.responseText                    
                }
                else{
                    alert('网站图标上传上传出错')
                }

            }
            xhr.send(formData);
        }
        // 分类
        
    },false)
    // 监听正文里的点击事件
    section.addEventListener('click',function(ev){
        // 写文章
        if(ev.target.classList[0] === 'btn_article_write'){
            var form = document.getElementById('form_article_write');
            var formData = new FormData(form);
            // 对输入的信息进行排查·
            // 如果没有选择文件，就把这个删了
            formData.getAll('cover')[0].size === 0 ? (formData.delete('cover')):'';
            var isTrue = true;
            formData.forEach(function(ev){
                if(!isTrue){
                    return false
                }
                if(typeof ev === 'string' ){
                    if(ev.trim().length === 0){
                        isTrue =false;
                        alert('请填写内容')
                        return false
                    }
                } 
                if(typeof ev === 'object'){
                    if(ev.type !== 'image/jpeg' && ev.size !== 0){
                        alert('封面请选择图片')
                        return false
                    }
                }

            })
            if(isTrue){
                // 添加文章
                if(ev.target.textContent === '添加'){
                    var xhr = new XMLHttpRequest();
                    xhr.open('post','/admin/add_article');
                    xhr.onload = function(){
                        if(xhr.status === 200){
                            if(xhr.responseText === 'true'){
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
                            else{
                                alert(xhr.responseText)
                            }
                        }
                        else{
                            alert('添加文章出错')
                        }
                    }
                    xhr.send(formData);                    
                }
                // 修改文章
                if(ev.target.textContent === '修改'){
                    var xhr = new XMLHttpRequest();
                    xhr.open('post','/admin/modify_article');
                    xhr.onload = function(){
                        if(xhr.status === 200){
                            if(xhr.responseText === 'true'){
                                // 文章列表
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
                                })                            }
                            else{
                                alert(xhr.responseText)
                            }
                        }
                        else{
                            alert('修改文章出错')
                        }
                    }
                    xhr.send(formData);                    
                }
            }
        }
        // 根据条件筛选
        if(ev.target.classList[0] === 'btn_screen'){
            var value_directory = document.getElementById('directory').value;
            var value_status = document.getElementById('status').value;
            var req = {
                directory:value_directory,
                status:value_status
            };
            value_directory === '' ? req = {status:value_status} : '';
            value_status === '' ? req = {directory:value_directory} : '';
            value_status === '' && value_directory === '' ? req = {} :'';
            Ajax({
                url:'/admin/screen_article',
                data:req,
                success:function(result){
                    console.log(result)
                    var list_article = template('list_article',{result,});
                    section.innerHTML = list_article;                },
                fail:function(xhr){
                    alert('文章筛选出错')
                }
            })
        }
        // 换页
        if(ev.target.classList[0] === 'page_change'){
            var select = ev.target.dataset.select;
            console.log(select);
            var page = ev.target.dataset.page;
            if(select === '0'){
                Ajax({
                    url:'/admin/article',
                    data:{
                        page,
                    },
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
            if(select === '1'){
                Ajax({
                    url:'/admin/comment',
                    data:{
                        page,
                    },
                    success:function(result){
                        result = JSON.parse(result);
                        var tem_comment = template('template_list_comment',{result,});
                        section.innerHTML = tem_comment
                    },
                    fail:function(){
                        alert('获取评论失败')
                    }
                })            
            }
            if(select === '2'){
                Ajax({
                    url:'/admin/slides',
                    success:function(result){
                        result = JSON.parse(result);            
                        var tem = template('template_slides',{result,});
                        section.innerHTML = tem;
                    },
                    fail:function(){
                        alert('获取图片轮播出错')
                    }
                })
                }
        }
        // 编辑文章
        if(ev.target.className === 'modify_article'){
            var id = ev.target.dataset.id;
            Ajax({
                data:{
                    id,
                },
                url:'/admin/article_modify',
                success:function(result,xhr){
                    result = JSON.parse(result);
                    console.log(result)
                    var tem_1 = template('section',result);
                    section.innerHTML = tem_1;
                },
                fail:function(){
                    alert('编辑文章出错')
                }
            })
            var ss = document.getElementById('directory_article');
            console.log(ss);
        }
        // 删除文章
        if(ev.target.className === 'delete_article'){
            var isConfirm = confirm('您确定要删除这个');
            if(isConfirm){
                var id = ev.target.dataset.id;
                Ajax({
                    url:'/admin/article_delete',
                    data:{
                        id,
                    },
                    success:function(result){
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
                        })                    },
                    fail:function(){
                        alert('删除失败')
                    }
                })
            }
        }
        // 批准评论或驳回评论
        if(ev.target.className === 'approval_comment'){
            if(ev.target.id === 'disable'){
                return false
            }
            var id = ev.target.dataset.id;
            var status = ev.target.dataset.status;
            Ajax({
                url:'/admin/approval',
                data:{
                    id,
                    status,
                },
                success:function(result){
                    if(result === true){
                        Ajax({
                            url:'/admin/comment',
                            success:function(result){
                                result = JSON.parse(result);
                                var tem_comment = template('template_list_comment',{result,});
                                section.innerHTML = tem_comment
                            },
                            fail:function(){
                                alert('获取评论失败')
                            }
                        })
                    }
                    else{
                        alert('审批评论错误')
                    }
                },
                fail:function(){
                    alert('批准评论错误')
                }
            })
        }
        // 删除评论
        if(ev.target.className === 'delete_comment'){
            var id = ev.target.dataset.id;
            var isConfirm = confirm('您确定要删除吗');
            if(isConfirm){
                Ajax({
                    url:'/admin/comment_delete',
                    data:{
                        id,
                    },
                    success:function(result){
                        if(result){
                            Ajax({
                                url:'/admin/comment',
                                success:function(result){
                                    result = JSON.parse(result);
                                    var tem_comment = template('template_list_comment',{result,});
                                    section.innerHTML = tem_comment
                                },
                                fail:function(){
                                    alert('获取评论失败')
                                }
                            })                        }
                    },
                    fail:function(){
                        alert('删除评论出错')
                    }
                })
            }
        }
        // 添加轮播
        if(ev.target.className === 'btn_add_slides'){
            var add_slides_form = document.getElementById('add_slides_form');
            var formData = new FormData(add_slides_form);
            formData.forEach(function(v){
                console.log(v)
            })
            var xhr = new XMLHttpRequest();
            xhr.open('post','/admin/slides_add');
            xhr.onload = function(){
                if(xhr.status === 200){
                    if(xhr.responseText === 'true'){
                        Ajax({
                            url:'/admin/slides',
                            success:function(result){
                                result = JSON.parse(result);            
                                var tem = template('template_slides',{result,});
                                section.innerHTML = tem;
                            },
                            fail:function(){
                                alert('获取图片轮播出错')
                            }
                        })                                }
                }
                else{
                    alert('添加轮播出错')
                }
            }
            xhr.send(formData);
        }
        // 网站图标
        if(ev.target.className === 'img_icon'){
            document.getElementById('icon_www').click()
        }
        // 修改网站设置
        if(ev.target.className === 'btn_setting'){
            var form_setting = document.getElementById('form_setting');
            var formData = new FormData(form_setting);
            formData.delete('ss'); 
            formData.get('comment') === null ? formData.set('comment','false'):'';
            formData.get('approval') === null ? formData.set('approval','false'):'';
            console.log(formData.get('comment'),formData.get('approval'))
            if(formData.get('name').trim().length === 0){
                alert('请输入网站名称')
                return false
            }
            var xhr = new XMLHttpRequest();
            xhr.open('post','/admin/setting');
            xhr.onload = function(){
                if(xhr.status === 200){
                    if(xhr.responseText === 'true'){
                        Ajax({
                            url:'/admin/setting',
                            success:function(result){
                                console.log(result);
                                var tem = template('template_setting',{result:result[0]});
                                section.innerHTML = tem
                            },
                            fail:function(){
                                alert('获取设置参数错误')
                            }
                        })                    
                    }
                    else{
                        alert('修改网站设置出错')
                    }
                }
                else{
                    alert('修改网站设置出错')
                }
            }
            xhr.send(formData)
        }
        // // 取消选择单选框
        // if(ev.target.id === 'radio_comment' || ev.target.id === 'radio_approval'){
        //     ev.target.dataset.status === 'false' ? (ev.target.checked = true,ev.target.value=true): (ev.target.checked = false,ev.target.value=false);
        //     ev.target.dataset.status === 'false' ? ev.target.dataset.status = 'true' : ev.target.dataset.status = 'false';
        // }
    },false)







    function dateformat(date){
        var reg = /^[\d]{4}-[\d]{2}-[\d]{2}/;
        return reg.exec(date)[0]
    }
})()