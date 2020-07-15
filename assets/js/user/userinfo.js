/* -------------------为表单赋值(数据回填)----------------- */
// 页面刷新，就发请求，获取用户信息
var form = layui.form;
function renderUser() {
    $.ajax({
        url: "/my/userinfo",
        success: function (res) {
            if (res.status === 0) {
                form.val('user', res.data);
            }
        }
    });
}
renderUser();

/* -------------------完成修改信息----------------- */
$('form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: data,
        success: function (res) {
            if (res.status === 0) {
                // 修改成功，更新index.html的欢迎语 
                // 调用index页面的 getUserInfo()
                window.parent.getUserInfo();
            }
        }
    })
});

/* -------------------重置表单----------------- */
$('button:contains("重置")').click(function (e) {
    e.preventDefault();
    renderUser();
});