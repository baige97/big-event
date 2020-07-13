$.ajaxPrefilter(function (options) {
    // 更改url
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // 统一配置
    options.complete = function (xhr) {
        if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败') {
            localStorage.removeItem("token");
            location.href = "/login.html";
        };
    }
    // 统一配置 headers
    options.headers = {
        Authorization: localStorage.getItem("token")
    }
})