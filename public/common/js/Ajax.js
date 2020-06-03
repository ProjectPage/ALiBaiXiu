function Ajax(req){
    // 创建默认属性/
    var defaults = {
        type:'get',
        header:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        success:function(){},
        fail:function(){}
    }
    // 覆盖对象
    Object.assign(defaults,req);
    // 创建Ajax对象
    var xhr = new XMLHttpRequest();
    // 拿到参数
    var params = defaults.type === 'get'?"?":"";
    for(let i in defaults.data){
        params += i + '=' + defaults.data[i] + '&';
    }
    params = params.substr(0,params.length - 1);
    //准备发送请求
    if(defaults.type === 'get'){
        xhr.open(defaults.type,defaults.url + params);
    }
    if(defaults.type === 'post'){
        xhr.open(defaults.type,defaults.url)
    }
    //添加响应成功回调函数
    xhr.onload = function(){
        // 服务器响应，它响应了什么类型的数据，是普通字符串，还是json字符串，还是xml
        xhr.getResponseHeader('Content-Type');
        if(xhr.status === 200){
            console.log(xhr.getResponseHeader('Content-Type'));
            xhr.getResponseHeader('Content-Type').includes('application/json')?defaults.success(JSON.parse(xhr.responseText),xhr):defaults.success(xhr.responseText,xhr);
        }
        else{
            defaults.fail(xhr)
        }
    }
    // 发送请求
    if(defaults.type === 'post'){
        console.log(defaults.header['Content-Type']);
        if(defaults.header["Content-Type"] === 'application/json'){
            xhr.setRequestHeader('Content-Type',defaults.header["Content-Type"]);
            xhr.send(JSON.stringify(defaults.data))
        }
        if(defaults.header["Content-Type"] === 'application/x-www-form-urlencoded'){
            xhr.setRequestHeader('Content-Type',defaults.header["Content-Type"]);
            xhr.send(params);
        };
    }
    if(defaults.type === 'get'){
        xhr.send();
    }
}

// module.exports = Ajax;