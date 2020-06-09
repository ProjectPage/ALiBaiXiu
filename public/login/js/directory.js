
(function(){
    // 更新分类列表页面
    var table_directory = document.querySelector('#table_directory');
    var dirHtml = table_directory.innerHTML;
    Ajax({
        url:'/admin/list_directory',
        success:function(result,xhr){
            var slide = document.querySelector('.slideo span');
            var tem_list = template('template_list_directory',{records:result.records});
            var tem_slide = template('template_slide',{result,});
            table_directory.innerHTML = dirHtml + tem_list;
            slide.innerHTML = tem_slide;
        },
        fail:function(xhr){
            alert('更新分类列表出错')
        }
    })
    // 给表格添加改变事件监听
    var table_directory = document.getElementById('table_directory');
    table_directory.addEventListener('change',function(ev){
            // 复选框全选状态改变
        if(ev.target.id === 'selectAll'){
            var select = document.querySelectorAll('#table_directory input[name="select"]');
            // 改变其他复选框的状态
            select.forEach(function(v){
                v.checked = ev.target.checked
            })
            ev.target.checked?many_delete.classList.remove('dispalyNone'):many_delete.classList.add('dispalyNone')
        }    
            // 如果是全部选中，那么全选就会被选
        if(ev.target.id === 'select'){
            var selectAll = document.querySelector('#selectAll');
            var select = document.querySelectorAll('#table_directory input[name="select"]');
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
    // 批量删除分类
    var many_delete = document.querySelector('.many_delete');
    many_delete.onclick = function(ev){
        var select = document.querySelectorAll('#table_directory input[name="select"]:checked');
        var id = {};
        for(let i = 0;i<select.length;i++){
            id[`id_${i}`] = select[i].value
        }
        var isConfirm = confirm('您确认要删除这些吗?');
        if(isConfirm){
            Ajax({
            url:'/admin/delete_directory',
            data:id,
            success:function(result,xhr){
                if(result){
                    location.reload()
                }
            },
            fail:function(xhr){
                alert('批量删除分类出错',xhr)
            }
        })
        }

    }
    // 分类列表
        // 给表格添加点击事件监听
    table_directory.addEventListener('click',function(ev){
        // 编辑用户
        if(ev.target.className === 'modify_directory'){
            var id = ev.target.dataset.id;
            Ajax({
                data:{
                    id,
                },
                url:'/admin/modify_directory',
                success:function(result,xhr){
                    var add_directory_form = document.getElementById('add_directory_form');
                    result = JSON.parse(result);
                    var tem = template('template_add_directory',result);
                    add_directory_form.innerHTML = tem;
                },
                fail:function(xhr){
                    alert('编辑分类目录请求出错')
                }
            })
        }
        // 删除一个用户
        if(ev.target.className === 'delete_directory'){
            var isConfirm = confirm('您确认要删除这个用户吗?');
            if(isConfirm){
                var id = ev.target.dataset.id;
                Ajax({
                    url:'/admin/delete_directory',
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
    // 监听修改按钮的点击事件
    var add_directory_form = document.getElementById('add_directory_form');
    add_directory_form.addEventListener('click',function(ev){
        // 添加按钮的功能
        if(ev.target.className === 'btn_add_directory'){
            var form = document.querySelector('#add_directory_form');
            // 2.拿到表单里面的值
            var formData = new FormData(form);
            var name_directory = formData.get('name_directory');
            var icon_directory = formData.get('icon_directory');
            // 3.对值进行验证
            if(name_directory.trim().length === 0 || icon_directory.trim().length === 0){
                alert('请填写内容！！！')
                return false
            }
            // 4.验证通过发送AJAX请求
                // 如果是添加用户
            if(ev.target.textContent === '添加'){
                directory_add_modify({
                url:'/admin/add_directory',
                formData,
                message:'这个名称被使用了或者请使用icon-xxxx写图标',
                error:'添加分类失败'
                })
            }
                // 如果是修改用户
            if(ev.target.textContent === '修改'){
                directory_add_modify({
                    url:'/admin/modify_directory',
                    formData,
                    message:'分类名称修改失败',
                    error:'修改分类失败'
                    })            
                }
   
        }
        function directory_add_modify(obj){
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
    },false)
    // 分页器
    var slide = document.querySelector('.slide span');
    slide.addEventListener('click',function(ev){
        console.log(ev);
        // /admin/list_directory?page={{$value - 0 + 1}}
        if(ev.target.tagName === 'A'){
            var page = ev.target.dataset.href;
            Ajax({
                data:{
                    page,
                },
                url:'/admin/list_directory',
                success:function(result,xhr){
                    var table_directory = document.querySelector('#table_directory');
                    var slide = document.querySelector('.slideo span');
                    var tem_list = template('template_list_directory',{records:result.records});
                    var tem_slide = template('template_slide',{result,});
                    table_directory.innerHTML = dirHtml + tem_list;
                    slide.innerHTML = tem_slide;                },
                fail:function(xhr){
                    alert('分类分页器出错')
                }
            })
        }
    },false)

})()
