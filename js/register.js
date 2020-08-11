// 获取元素
const inputName = document.querySelector('#username');
const inputPwd = document.querySelector('#password');
const form = document.querySelector('form');

// 点击button
form.addEventListener('submit', (e) => {
  // 取消表单默认行为
  e.preventDefault();
  // 获取input中输入的值
  const name = inputName.value;
  const pwd = inputPwd.value;
  // 发送请求
  utils.fetch({ url: '../api/user/register.php', data: { name, pwd }, method: 'post' }).then(resp => {
    if (resp.code === 200) {
      alert(resp.body.msg + "马上跳转到登录页面");
      location.href = '../html/login.html';
    }
  });
}, false);