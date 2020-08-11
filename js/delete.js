// 再次绑定监听
tbody.addEventListener('click', e => {
  // 获取目标对象
  var target = e.target;
  // 获取目标对象的所有class值
  var classList = Array.from(target.classList);
  // 通过目标对象的parentNode来向上查找tr
  var tr = target.parentNode.parentNode;
  // 判断class数组中是否有shop-del从而判断是否点击的删除按钮
  if (classList.includes('shop-del')) {
    // 通过自定义属性获取要删除数据在数据库中的id值
    var id = tr.getAttribute('data-id');
    // 发送封装好的ajax请求
    utils.fetch({ url: './api/shop/delete.php', data: { id } }).then(resp => {
      if (resp.code === 200) {
        getDate();
      }
    })
  }
});