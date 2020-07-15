// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')

// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

/* ----------------------点击上传 触发隐藏域--------------------- */
$('button:contains("上传")').click(function () {
    $('#file').click();
});

/* ----------------------文件域的内容改变的时候，更换剪裁区的图片--------------------- */
$('#file').change(function () {

    var fileObj = this.files[0];
    // 为文件对象创建一个url（使用js内置对象的方法，为文件对象创建了一个用于访问他的临时的url）
    var url = URL.createObjectURL(fileObj);

    // 要更换剪裁区的图片，需要先销毁剪裁区
    $image.cropper('destroy');
    $image.attr('src', url);
    $image.cropper(options);
});

/* ----------------------点击确定，剪裁图片，转成base64格式，ajax提交--------------------- */
$('button:contains("确定")').click(function () {
    var canvas = $image.cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    })
    // 把 canvas图片转成base64格式
    var img_base64 = canvas.toDataURL('image/png');
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: { avatar: img_base64 },
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 更换成功，调用父页面的 getUserInfo,重新渲染头像
                window.parent.getUserInfo();
            }
        }
    });
});