// ------------------获取用户信息----------------
function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        success: function (res) {
            if (res.status === 0) {
                var name = res.data.nickname || res.data.username;
                $('.username').html('&nbsp;' + name);

                // 判断是否有头像
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text_avatar').hide();
                } else {
                    // 说明没有图片
                    var firstWord = name.substr(0, 1).toUpperCase(); // 截取对中文也有效
                    $('.text_avatar').text(firstWord).css('display', 'inline-block');
                    $('.layui-nav-img').hide();
                }
            }
        }
    });
};
getUserInfo();

$('#logout').click(function () {
    layer.confirm('确认要退出吗', function (index) {
        // 1、删除token、
        localStorage.removeItem('token');
        // 2、跳转到 登录页面，
        location.href = '/login.html';
        // 3、关闭弹框
        layer.close(index);
    });
});