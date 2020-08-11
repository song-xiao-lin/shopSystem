// 获取元素
const span = document.querySelector('#shop-span');
const loginUl = document.querySelector('#shop-login');
const outUl = document.querySelector('#shop-out');

// 获取cookie中存储的登录信息
const username = utils.cookie('name');
if (username) {
  loginUl.classList.add('shop-hide');
  outUl.classList.remove('shop-hide');
  span.innerHTML = username;
}

// 退出登录
outUl.addEventListener('click', () => {
  utils.cookie('name', '', { path: '/', expires: -1 });
  loginUl.classList.remove('shop-hide');
  outUl.classList.add('shop-hide');
}, false);