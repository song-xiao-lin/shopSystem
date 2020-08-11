// 发送请求获取所有数据渲染表格
const tbody = document.querySelector('#shop-table');
getDate();
// 这里url不用返回上一级，虽然代码在js目录里，但是ajax请求在首页发的，相对路径要从首页开始算
function getDate() {
  utils.fetch({ url: './api/shop/select.php' }).then(resp => {
    // console.log(resp);
    if (resp.code === 200) {
      // ES6的解构赋值
      // 拿到后端返回的数据
      const { list } = resp.body;
      console.log(list);
      let html = '';
      list.forEach((shop, index) => {
        html += `
          <tr data-id="${shop.Id}">
            <td>${index + 1}</td>
            <td><span class="">${shop.name}</span><input type="text" name="" id="shop-input-name" class="form-control "></td>
            <td><span class="">${shop.price}</span><input type="text" name="" id="shop-input-price" class="form-control"></td>
            <td><span class="">${shop.num}</span><input type="text" name="" id="shop-input-num" class="form-control"></td>
            <td>
              <button class="btn btn-info btn-sm shop-edit">编辑</button>
              <button class="btn btn-danger btn-sm shop-del">删除</button>
              <button class="btn btn-success btn-sm shop-sure">确定</button>
              <button class="btn btn-warning btn-sm shop-cancel">取消</button>
            </td>
          </tr>
        `;
      });
      tbody.innerHTML = html;
    }
  });
}
