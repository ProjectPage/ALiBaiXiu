(function(){
    // 获得主体内容
    var tem = template('section',{});
    var section = document.querySelector('section');
    section.innerHTML = tem;
    // 获得分类
    Ajax({
        url:'/admin/get_directory',
        success:function(result,xhr){
            console.log(result)
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
    // 监听正文里的改变事件
    section.addEventListener('change',function(ev){
        // 封面
        if(ev.target.id === 'cover_article'){
            var cover_article = document.getElementById('cover_article');
            // cover_article.value = ev.target.files[0]
        }
        // 分类
        
    },false)
    // 监听正文里的点击事件
    section.addEventListener('click',function(ev){
        // 写文章
        if(ev.target.className === 'btn_article_write'){
            var form = document.getElementById('form_article_write');
            var formData = new FormData(form);
            // 对输入的信息进行排查·
            // 如果没有选择文件，就把这个删了
            formData.getAll('cover')[0].size === 0 ? (formData.delete('cover')):'';
            var isTrue = true;
            formData.forEach(function(ev){
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
                var xhr = new XMLHttpRequest();
                xhr.open('post','/admin/add_article');
                xhr.onload = function(){
                    if(xhr.status === 200){
                        if(xhr.responseText === 'true'){
                            location.href = '/admin/article_write'
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
        }
        // 根据条件筛选
        if(ev.target.className === 'btn_screen'){
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
        if(ev.target.className === 'page_change'){
            console.log(ev);
            var page = ev.target.dataset.page;
            Ajax({
                url:'/admin/article',
                data:{
                    page,
                },
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
    },false)

})()


// 现在要写筛选
// 1.在选择哪里选中筛选条件
// 2.点击筛选，拿到条件并发给服务器
// 3.服务器拿到条件，就从数据库中筛选到值，并返回给客户端
// 4.客户端将值与模板拼接