tbody.addEventListener('click', e => {
  // 获取事件委托
  const target = e.target;
  // classList获取的是拆开之后的class列表，是一个类数组对象，转成数组方便操作
  const classes = Array.from(target.classList);
  // console.log(classes);
  // 从当前按钮出发找tr
  const tr = target.parentNode.parentNode;
  if (classes.includes('shop-edit')) {
    tr.classList.add('edit');
    // 找到这一行的所有span
    const spans = tr.querySelectorAll('span');
    spans.forEach(span => {
      // span的下一个兄弟元素input的value等于当前span的innerHTML
      span.nextElementSibling.value = span.innerHTML;
    });
  } else if (classes.includes('shop-sure')) {
    // 确定
    // 把修改之后的数据发送后端，成功以后再修改前端
    // 获取tr上的自定义属性id
    const Id = tr.getAttribute('data-id');
    const name = tr.querySelector('#shop-input-name').value;
    const price = tr.querySelector('#shop-input-price').value;
    const num = tr.querySelector('#shop-input-num').value;
    utils.fetch({ url:'./api/shop/update.php', data: { Id, name, price, num } }).then(resp => {
      // console.log(resp);
      if (resp.code === 200) {
        // 更新成功
        tr.classList.remove('edit');
        // 把input里面的value给对应span的innerHTML
        const spans = tr.querySelectorAll('span');
        spans.forEach(span => {
          span.innerHTML = span.nextElementSibling.value;
        });
      }
    });
  } else if (classes.includes('shop-cancel')) {
    // 恢复默认状态
    tr.classList.remove('edit');
  }
});