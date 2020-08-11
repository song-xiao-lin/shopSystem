// 添加商品
const inputName = document.querySelector('#shop-name');
const inputPrice = document.querySelector('#shop-price');
const inputNum = document.querySelector('#shop-num');
const btnAdd = document.querySelector('#shop-add');

// 添加按钮绑定事件
btnAdd.addEventListener('click', () => {
  // 获取input框中输入的值
  const name = inputName.value,
    price = inputPrice.value,
    num = inputNum.value;

  // 向后端发起封装好的ajax请求
  utils.fetch({ url: './api/shop/add.php', data: { name, price, num } }).then(resp => {
    if (resp.code === 200) {
      $('#addShop').modal('hide');
      // 重新请求数据
      getDate();
    } else {
      // 失败
      alert(resp.body.msg);
    }
  })
});

$('#addShop').on('hidden.bs.modal', function (e) {
  // 当模态框被影藏之后的事件,将input里面的内容重置为空
  inputName.value = inputPrice.value = inputNum.value = ''
})