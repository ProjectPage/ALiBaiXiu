(function(){
    // 给模板定义一个变量
    template.defaults.imports.dateformat = dateformat; 
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
    // section.addEventListener('change',function(ev){
    //     // 封面
    //     if(ev.target.id === 'cover_article'){
    //         var cover_article = document.getElementById('cover_article');
    //         // cover_article.value = ev.target.files[0]
    //     }
    //     // 分类
        
    // },false)
    // // 监听正文里的点击事件
    // section.addEventListener('click',function(ev){
    //     // 写文章
    //     if(ev.target.className === 'btn_article_write'){
    //         var form = document.getElementById('form_article_write');
    //         var formData = new FormData(form);
    //         // 对输入的信息进行排查·
    //         // 如果没有选择文件，就把这个删了
    //         formData.getAll('cover')[0].size === 0 ? (formData.delete('cover')):'';
    //         var isTrue = true;
    //         formData.forEach(function(ev){
    //             if(!isTrue){
    //                 return false
    //             }
    //             if(typeof ev === 'string' ){
    //                 if(ev.trim().length === 0){
    //                     isTrue =false;
    //                     alert('请填写内容')
    //                     return false
    //                 }
    //             } 
    //             if(typeof ev === 'object'){
    //                 if(ev.type !== 'image/jpeg' && ev.size !== 0){
    //                     alert('封面请选择图片')
    //                     return false
    //                 }
    //             }

    //         })
    //         if(isTrue){
    //             // 添加文章
    //             if(ev.target.textContent === '添加'){
    //                 var xhr = new XMLHttpRequest();
    //                 xhr.open('post','/admin/add_article');
    //                 xhr.onload = function(){
    //                     if(xhr.status === 200){
    //                         if(xhr.responseText === 'true'){
    //                             Ajax({
    //                                 url:'/admin/article',
    //                                 success:function(result,xhr){
    //                                     result = JSON.parse(result);
    //                                     template.defaults.imports.dateformat = dateformat; 
    //                                     var list_article = template('list_article',{result,});
    //                                     section.innerHTML = list_article;
    //                                     function dateformat(date){
    //                                         var reg = /^[\d]{4}-[\d]{2}-[\d]{2}/;
    //                                         return reg.exec(date)[0]
    //                                     }
    //                                 },
    //                                 fail:function(xhr){
    //                                     alert('获取分类出错')
    //                                 }
    //                             })
    //                         }
    //                         else{
    //                             alert(xhr.responseText)
    //                         }
    //                     }
    //                     else{
    //                         alert('添加文章出错')
    //                     }
    //                 }
    //                 xhr.send(formData);                    
    //             }
    //             // 修改文章
    //             if(ev.target.textContent === '修改'){
    //                 var xhr = new XMLHttpRequest();
    //                 xhr.open('post','/admin/modify_article');
    //                 xhr.onload = function(){
    //                     if(xhr.status === 200){
    //                         if(xhr.responseText === 'true'){
    //                             // 文章列表
    //                             Ajax({
    //                                 url:'/admin/article',
    //                                 success:function(result,xhr){
    //                                     result = JSON.parse(result);
    //                                     template.defaults.imports.dateformat = dateformat; 
    //                                     var list_article = template('list_article',{result,});
    //                                     section.innerHTML = list_article;
    //                                     function dateformat(date){
    //                                         var reg = /^[\d]{4}-[\d]{2}-[\d]{2}/;
    //                                         return reg.exec(date)[0]
    //                                     }
    //                                 },
    //                                 fail:function(xhr){
    //                                     alert('获取分类出错')
    //                                 }
    //                             })                            }
    //                         else{
    //                             alert(xhr.responseText)
    //                         }
    //                     }
    //                     else{
    //                         alert('修改文章出错')
    //                     }
    //                 }
    //                 xhr.send(formData);                    
    //             }
    //         }
    //     }
    //     // 根据条件筛选
    //     if(ev.target.className === 'btn_screen'){
    //         var value_directory = document.getElementById('directory').value;
    //         var value_status = document.getElementById('status').value;
    //         var req = {
    //             directory:value_directory,
    //             status:value_status
    //         };
    //         value_directory === '' ? req = {status:value_status} : '';
    //         value_status === '' ? req = {directory:value_directory} : '';
    //         value_status === '' && value_directory === '' ? req = {} :'';
    //         Ajax({
    //             url:'/admin/screen_article',
    //             data:req,
    //             success:function(result){
    //                 console.log(result)
    //                 var list_article = template('list_article',{result,});
    //                 section.innerHTML = list_article;                },
    //             fail:function(xhr){
    //                 alert('文章筛选出错')
    //             }
    //         })
    //     }
    //     // 换页
    //     if(ev.target.className === 'page_change'){
    //         var select = ev.target.dataset.select;
    //         console.log(select);
    //         var page = ev.target.dataset.page;
    //         if(select === '0'){
    //             Ajax({
    //                 url:'/admin/article',
    //                 data:{
    //                     page,
    //                 },
    //                 success:function(result,xhr){
    //                     result = JSON.parse(result);
    //                     var list_article = template('list_article',{result,});
    //                     section.innerHTML = list_article;
    //                 },
    //                 fail:function(xhr){
    //                     alert('获取分类出错')
    //                 }
    //             })                
    //         }
    //         if(select === '1'){
    //             Ajax({
    //                 url:'/admin/comment',
    //                 data:{
    //                     page,
    //                 },
    //                 success:function(result){
    //                     result = JSON.parse(result);
    //                     var tem_comment = template('template_list_comment',{result,});
    //                     section.innerHTML = tem_comment
    //                 },
    //                 fail:function(){
    //                     alert('获取评论失败')
    //                 }
    //             })            
    //         }
    //     }
    //     // 编辑文章
    //     if(ev.target.className === 'modify_article'){
    //         var id = ev.target.dataset.id;
    //         Ajax({
    //             data:{
    //                 id,
    //             },
    //             url:'/admin/article_modify',
    //             success:function(result,xhr){
    //                 result = JSON.parse(result);
    //                 console.log(result)
    //                 var tem_1 = template('section',result);
    //                 section.innerHTML = tem_1;
    //             },
    //             fail:function(){
    //                 alert('编辑文章出错')
    //             }
    //         })
    //         var ss = document.getElementById('directory_article');
    //         console.log(ss);
    //     }
    //     // 删除文章
    //     if(ev.target.className === 'delete_article'){
    //         var isConfirm = confirm('您确定要删除这个');
    //         if(isConfirm){
    //             var id = ev.target.dataset.id;
    //             Ajax({
    //                 url:'/admin/article_delete',
    //                 data:{
    //                     id,
    //                 },
    //                 success:function(result){
    //                     Ajax({
    //                         url:'/admin/article',
    //                         success:function(result,xhr){
    //                             result = JSON.parse(result);
    //                             template.defaults.imports.dateformat = dateformat; 
    //                             var list_article = template('list_article',{result,});
    //                             section.innerHTML = list_article;
    //                             function dateformat(date){
    //                                 var reg = /^[\d]{4}-[\d]{2}-[\d]{2}/;
    //                                 return reg.exec(date)[0]
    //                             }
    //                         },
    //                         fail:function(xhr){
    //                             alert('获取分类出错')
    //                         }
    //                     })                    },
    //                 fail:function(){
    //                     alert('删除失败')
    //                 }
    //             })
    //         }
    //     }
    //     // 批准评论或驳回评论
    //     if(ev.target.className === 'approval_comment'){
    //         if(ev.target.id === 'disable'){
    //             return false
    //         }
    //         var id = ev.target.dataset.id;
    //         var status = ev.target.dataset.status;
    //         Ajax({
    //             url:'/admin/approval',
    //             data:{
    //                 id,
    //                 status,
    //             },
    //             success:function(result){
    //                 if(result === true){
    //                     Ajax({
    //                         url:'/admin/comment',
    //                         success:function(result){
    //                             result = JSON.parse(result);
    //                             var tem_comment = template('template_list_comment',{result,});
    //                             section.innerHTML = tem_comment
    //                         },
    //                         fail:function(){
    //                             alert('获取评论失败')
    //                         }
    //                     })
    //                 }
    //                 else{
    //                     alert('审批评论错误')
    //                 }
    //             },
    //             fail:function(){
    //                 alert('批准评论错误')
    //             }
    //         })
    //     }
    //     // 删除评论
    //     if(ev.target.className === 'delete_comment'){
    //         var id = ev.target.dataset.id;
    //         var isConfirm = confirm('您确定要删除吗');
    //         if(isConfirm){
    //             Ajax({
    //                 url:'/admin/comment_delete',
    //                 data:{
    //                     id,
    //                 },
    //                 success:function(result){
    //                     if(result){
    //                         Ajax({
    //                             url:'/admin/comment',
    //                             success:function(result){
    //                                 result = JSON.parse(result);
    //                                 var tem_comment = template('template_list_comment',{result,});
    //                                 section.innerHTML = tem_comment
    //                             },
    //                             fail:function(){
    //                                 alert('获取评论失败')
    //                             }
    //                         })                        }
    //                 },
    //                 fail:function(){
    //                     alert('删除评论出错')
    //                 }
    //             })
    //         }
    //     }
    // },false)



    
    function dateformat(date){
        var reg = /^[\d]{4}-[\d]{2}-[\d]{2}/;
        return reg.exec(date)[0]
    }
})()


// 现在要写筛选
// 1.在选择哪里选中筛选条件
// 2.点击筛选，拿到条件并发给服务器
// 3.服务器拿到条件，就从数据库中筛选到值，并返回给客户端
// 4.客户端将值与模板拼接


// 现在要做编辑文章功能
// 1.点击编辑发送Ajax请求，将该文章的id传到服务器
// 2.服务器拿到参数进行排查
// 3.查到就返回这个值
// 4.在客户端将值与模板尽心拼接
// 5.添加到页面上