/* -------------------重置密码的表单验证----------------- */
var form = layui.form;
form.verify({
    // 1、判断密码长度
    len: [/^\S{6,12}$/, '密码长度必须是6-12位，且不能出现空格'],
    // 2、判断新密码和原密码不能相同
    diff: function (val) {
        // 形参 val 表示输入的新密码
        let oldPwd = $('.oldPwd').val();
        if (oldPwd === val) {
            return '新密码不能与原密码相同';
        }
    },
    // 3、两次新密码必须一致
    same: function (val) {
        let newPwd = $('.newPwd').val();
        if (newPwd !== val) {
            return '两次新密码不一致';
        }
    }
});

/* -------------------按照接口要求，完成密码重置----------------- */
$('form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.post('/my/updatepwd', data, function (res) {
        layer.msg(res.message);
        if (res.status === 0) {
            $('form')[0].reset();
        }
    });
});