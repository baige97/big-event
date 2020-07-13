// ********************  切换登录和注册的盒子 ********************
$('#showReg').click(function () {
    $('.login').hide().next().show();
});
$('#showLogin').click(function () {
    $('.login').show().next().hide();
});

// ********************  完成注册功能 ********************
$(".register form").on('submit', function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    // console.log(data);
    $.ajax({
        type: 'POST',
        url: 'http://www.liulongbin.top:3007/api/reguser',
        data: data,
        success: function (res) {
            // 无论注册成功还是失败，都给提示
            layer.msg(res.message);
            if (res.status === 0) {
                $('.register form')[0].reset();
                // 如果注册成功，显示登录的盒子，隐藏注册的盒子
                $('.login').show().next().hide();
            }
        }
    });
});

// ********************  表单验证 ********************
// 使用layui提供的form模块之前，必须先引入模块
var form = layui.form;
form.verify({
    len: function (val) {
        if (!/^\S{6,12}$/.test(val)) {
            return '密码长度不正确，请改正';
        }
    },
    same: function (val) {
        // 获取密码
        var pwd = $('#pwd').val();
        if (pwd !== val) {
            return '两次密码不一致'
        }
    }
});

// ********************  登录表单验证 ********************
$('.login form').on('submit', function (e) {
    e.preventDefault();
    // 检查那么属性是否和接口参数一致
    var data = $(this).serialize();
    // console.log(data);
    $.ajax({
        type: 'POST',
        url: 'http://www.liulongbin.top:3007/api/login',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                localStorage.setItem("token", res.token);
                location.href = '/index.html';
            }
        }
    });

});

