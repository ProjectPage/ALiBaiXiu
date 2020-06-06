+(function(){
    // 当前登录用户
    var user_email = document.querySelector('#user_email');
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
            user_email.value = result.email;
        },
        fail:function(xhr){
            alert('在用户页面获取登录信息错误')
        }
    })
    // 用户详情列表
    Ajax({
        type:'post',
        url:'/admin/user_list',
        success:function(result,xhr){
            result = JSON.parse(result);
            // 对数据进行排序，登录的用户在第一个
            for(let i = 0;i<result.userAll.length;i++){
                for(let y in result.userAll[i]){
                    if(result.user_now === result.userAll[i].email){
                        var array = [];
                        array = result.userAll[0];
                        result.userAll[0] = result.userAll[i];
                        result.userAll[i] = array;
                        break
                }
                }
            }
            console.log(result);
            var tem = template('user_list',{result,});
            var user_list_table = document.querySelector('.user_right table');
            var user_list_table_initHtml = user_list_table.innerHTML;
            tem = user_list_table_initHtml + tem;
            user_list_table.innerHTML = tem;
        },
        fail:function(xhr){
            alert('用户列表获取失败')
        }
    })
    // 1.给按钮添点击事件，检测数值是否符合规则，符合就发送请求
    var user_left = document.querySelector('.user_left');
    // 给元素添加监听事件，因为使用模板实在最后将模板添加到页面上的，所以这时候如果使用绑定就会报没有找到这个元素
    user_left.addEventListener('click',function(ev){
        // 添加按钮的功能
        if(ev.target.className === 'user_add_btn'){
            var form = document.getElementById('user_form');
            var srcImg = document.querySelector('.src_img');
            // 2.拿到表单里面的值
            var formData = new FormData(form);
            var email = formData.get('email');
            var Nickname = formData.get('Nickname');
            var password = formData.get('password');
            var activation = formData.get('activation');
            var power = formData.get('power');
            var src_img = srcImg.value;
            // 3.对值进行验证
            var isTrue = form_verification({
                email,Nickname,password,activation,power,src_img,
            },message=>{
                alert(message);
                return false
            });
            if(isTrue === false){
                return false
            }
            // 4.验证通过发送AJAX请求
                // 如果是添加用户
            if(ev.target.textContent === '添加'){
                user_add_modify({
                url:'/admin/user_add',
                formData,
                message:'这个邮箱被注册了',
                error:'添加用户失败'
                })
            }
                // 如果是修改用户
            if(ev.target.textContent === '修改'){
                user_add_modify({
                    url:'/admin/user_modify',
                    formData,
                    message:'用户修改失败',
                    error:'修改用户失败'
                    })            }
        function form_verification(o,callback){
            // 验证
            // 分别验证/
            // 返回指定消息
            for(let i in o){
                // 验证邮箱
                if(i === 'email'){
                    if(o[i].trim().length === ''){
                        callback('邮箱没输入');
                        return false
                    }
                }
                // 昵称验证
                if(i === 'Nickname'){
                    var len = o[i].trim().length;
                    if(len === '' || len < 1 || len > 8){
                        callback('昵称不符合规则');
                        return false
                    }
                }
                // 密码验证
                if(i === 'password'){
                    var len = o[i].trim().length;
                    if(len === '' || len < 8 || len > 20){
                        callback('密码不符合规则');
                        return false
                    }
                }
                // 激活验证
                if(i === 'activation'){
                    if(o[i] === null){
                        callback('请确认是否激活');
                        return false
                    }
                }
                // 权限验证
                if(i === 'power'){
                    if(o[i] === null){
                        callback('请给用户配置权限');
                        return false
                    }
                }
                // 头像路径验证
                if(i === 'src_img'){
                    if(o[i] === ''){
                        callback('请选择好看的头像');
                        return false
                    }
                }

            }
        }        
        }
        // 点击图片触发文件的选择
        if(ev.target.className === 'touxiang_img'){
            var file = document.getElementById('touxiang_file');
            file.click();
        }

    },false)
    // 将图片上传到服务器，服务器返回地址
    user_left.addEventListener('change',function(ev){
        if(ev.target.id === 'touxiang_file'){
            var touxiang = document.querySelector('.touxiang_img');
            var srcImg = document.querySelector('.src_img');
            var formData = new FormData();
            // 排除上传不是图片的文件
            if(ev.target.files[0].type !== 'image/jpeg'){
                alert('请选择图片，不要皮');
                return false
            }
            formData.append('touxiang_img',ev.target.files[0]);
            var xhr = new XMLHttpRequest();
            xhr.open('post','/admin/upload');
            xhr.send(formData);
            xhr.onload = function(){
                if(xhr.status === 200){
                    touxiang.src = srcImg.value = xhr.responseText;
                }
                else{
                    alert('头像上传失败')
                }
            }        }
    },false)

    // 用户列表
    var user_table = document.querySelector('#user_table');
        // 给表格添加点击事件监听
    user_table.addEventListener('click',function(ev){
        // 编辑用户
        if(ev.target.className === 'user_modify'){
            var id = ev.target.dataset.id;
            Ajax({
                data:{
                    id,
                },
                url:'/admin/user_modify',
                success:function(result,xhr){
                    result = JSON.parse(result);
                    var tem = template('user_form_template',result);
                    user_left.innerHTML = tem;
                },
                fail:function(xhr){
                    alert('编辑用户请求出错')
                }
            })
        }
        // 删除一个用户
        if(ev.target.className === 'user_delete'){
            var isConfirm = confirm('您确认要删除这个用户吗?');
            if(isConfirm){
                var id = ev.target.dataset.id;
                Ajax({
                    url:'/admin/user_delete',
                    data:{
                        id,
                    },
                    success:function(result,xhr){
                        if(result === true){
                            location.reload()
                        }
                        else{
                            alert('删除用户失败')
                        }
                    },
                    fail:function(xhr){
                        alert('删除用户出错')
                    }
                })                
            }
        }
    },false)
        // 给表格添加改变事件监听
    user_table.addEventListener('change',function(ev){
            // 复选框全选状态改变
        if(ev.target.id === 'selectAll'){
            var select = document.querySelectorAll('.user_right input[name="select"]');
            // 改变其他复选框的状态
            select.forEach(function(v){
                v.checked = ev.target.checked
            })
            ev.target.checked?many_delete.classList.remove('dispalyNone'):many_delete.classList.add('dispalyNone')
        }    
            // 如果是全部选中，那么全选就会被选
        if(ev.target.id === 'select'){
            var selectAll = document.querySelector('#selectAll');
            var select = document.querySelectorAll('.user_right input[name="select"]');
            var count = 0;
            // 查看选中状态
            select.forEach(function(v){
                if(v.checked === true){
                    count += 1;
                    many_delete.classList.remove('dispalyNone')
                }
                else{
                    return
                }
            })
            count === select.length ? selectAll.checked = true:selectAll.checked = false;
            count === 0?many_delete.classList.add('dispalyNone'):''
        }

        // 查看复选框的选中状态
        function select_statu(){
            var selectAll = document.querySelector('#selectAll');
            var select = document.querySelectorAll('.user_right input[name="select"]');
            var count = 0;
            // 查看选中状态
            select.forEach(function(v){
                if(v.checked === false){
                    return 
                }
                else{
                    count += 1
                }
            })
            if(count === select.length){
                return true
            }
            else{
                return false
            }        
        }
    },false)
    // 修改/添加用户的点击事件中的AJAX请求
    function user_add_modify(obj){
        var xhr = new XMLHttpRequest();
        xhr.open('post',obj.url);
        xhr.send(obj.formData);
        xhr.onload = function(){
            if(xhr.status === 200){
                if(xhr.responseText === 'true'){
                    location.reload();
                }
                else{
                    alert(obj.message)
                }
            }
            else{
                console.log(obj.error)
            }

        }    }
    // 批量删除用户
    var many_delete = document.querySelector('.many_delete');
    many_delete.onclick = function(ev){
        var select = document.querySelectorAll('.user_right input[name="select"]:checked');
        var id = {};
        for(let i = 0;i<select.length;i++){
            id[`id_${i}`] = select[i].value
        }
        var isConfirm = confirm('您确认要删除这些吗?');
        if(isConfirm){
            Ajax({
                url:'/admin/user_delete',
                data:id,
                success:function(result,xhr){
                    if(result){
                        location.reload()
                    }
                },
                fail:function(xhr){
                    alert('批量删除用户出错')
                }
            })            
        }

    }
})()

// 现在要做的是给那个a添加一个点击事件，默认阻止跳转
// var nav_list = document.querySelector('.nav_list');
// nav_list.addEventListener('click',function(ev){
//     if(ev.target.className === 'title_article_write'){
//         Ajax({

//         })
//     }
// },false)
// // 1.首先得选中
// // 2.监听函数
// // 3.发送Ajax请求
// // 4.服务器返回数据
// // 5.模板拼接