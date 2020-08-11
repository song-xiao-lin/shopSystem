// 获取元素
const inputName = document.querySelector('#username');
const inputPwd = document.querySelector('#password');
const checkBtn = document.querySelector('#check');
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  // 取消表单默认提交样式
  e.preventDefault();
  // 获取输入的input值
  const name = inputName.value;
  const pwd = inputPwd.value;
  // 发送请求
  utils.fetch({ url: '../api/user/login.php', data: { name, pwd }, method: 'post' }).then(resp => {
    // 判断是否登录成功
    if (resp.code === 200) {
      if (checkBtn.checked) {
        // 设置cookie
        utils.cookie('name', name, { path: '/', expires: 7 });
      }
      utils.cookie('name', name, { path: '/' });
      alert(resp.body.msg + '马上跳转到首页');
      location.replace('../index.html');
    } else {
      alert(resp.body.msg);
    }
  })
}, false);