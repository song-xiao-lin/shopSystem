const utils = {
  /**
   * 缓冲运动
   * @param {object} node 要运动的元素
   * @param {object} cssObj css样式的最终值
   * @param {Function} complate 回调函数 
   */
  startMove(node, cssObj, complate) {
    clearInterval(node.time);
    node.time = setInterval(() => {
      let isEnd = true;
      for (let attr in cssObj) {
        let targetValue = cssObj[attr];
        let icur = null;
        if (attr == 'opacity') {
          icur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
        } else {
          icur = parseInt(getStyle(node, attr));
        }
        let speed = (targetValue - icur) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (attr == 'opacity') {
          icur += speed;
          node.style.opacity = icur / 100;
          node.style.filter = `alpha(opacity=${icur})`;
        } else {
          node.style[attr] = icur + speed + 'px';
        }
        if (icur != targetValue) {
          isEnd = false;
        }
      }
      if (isEnd) {
        clearInterval(node.time);
        if (complate) {
          complate.call(node);
        }
      }
    }, 30);
  },

  /**
   * 兼容获取样式
   * @param {object} node 元素
   * @param {string} cssStr css属性名
   */
  getStyle(node, cssStr) {
    return node.currentStyle ? node.currentStyle[cssStr] : getComputedStyle(node)[cssStr];
  },

  /**
   * 存cookie
   * @param {string} key cookie的名称
   * @param {string} value 设置cookie的值
   * @param {object} param2 可传expires, path, domain
   */
  setCookie(key, value, { expires, path, domain }) {
    let str = `${key}=${encodeURIComponent(value)}`;
    if (expires) {
      let date = new Date();
      date.setDate(expires + date.getDate());
      str += `;expires=${date.toUTCString()}`;
    }
    if (path) {
      str += `;path=${path}`;
    }
    if (domain) {
      str += `;domain=${domain}`;
    }
    document.cookie = str;
  },

  /**
   * 获取cookie值
   * @param {string} key cookie名称
   * @return cookie值
   */
  getCookie(key) {
    let str = document.cookie;
    //将str以; 进行分割成数组
    let arr = str.split('; ');
    let obj = new Object();
    arr.forEach(item => {
      let subArr = item.split('=');
      //将每一对按照键值对的形式，存储到obj中
      obj[subArr[0]] = decodeURIComponent(subArr[1]);
    })
    return obj[key];
  },

  /**
   * 删除一条cookie
   * @param {string} key cookie名称
   * @param {string} [path] 路径
   */
  removeCookie(key, path) {
    let date = new Date();
    date.setDate(date.getDate() - 1); // 过期时间设置为昨天
    let str = `${key}='';expires=${date.toUTCString()}`;
    console.log(str);
    if (path) {
      str += `;path=${path}`;
    }
    document.cookie = str;
  },

  /**
   * 设置、删除、添加cookie
   * @param {string} key cookie的名称
   * @param {string} value cookie的值
   * @param {object} options cookie的可变参数
   * 设置：utils.cookie('haah', '18', {});
   * 获取：utils.cookie('haah')
   * 删除：utils.cookie('haah', '', { expires: -1 })
   */
  cookie(key, value, options) {
    if (value || value === '') {
      this.setCookie(key, value, options);
    } else {
      return this.getCookie(key);
    }
  },

  /**
   * ajax请求
   * @param {object} { method = 'get', url, data, success, error, isJSON = true }
   * isJSON默认返回json格式数据,如果不需要json格式的数据，isJSON传false
   */
  ajax({ method = 'get', url, data, success, error, isJSON = true }) {
    let xhr = null;
    try {
      xhr = new XMLHttpRequest();
    } catch (error) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (data) {
      data = this.queryString(data);
    }
    if (method === 'get' && data) {
      url += '?' + data;
    }
    xhr.open(method, url, true);
    if (method === 'get') {
      xhr.send();
    } else {
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          let data = isJSON ? JSON.parse(xhr.responseText) : xhr.responseText;
          success && success(data);
        } else {
          error && error('error ' + xhr.status);
        }
      }
    }
  },

  /**
   * 将对象转成queryString
   * @param {object} obj 请求参数
   */
  queryString(obj) {
    let str = '';
    for (let attr in obj) {
      str += `${attr}=${obj[attr]}&`;
    }
    // return str.substring(0, str.length - 1);
    return str.slice(0, -1);
  },

  /**
   * 通过jsonp获取数据
   * @param {string} url 请求地址
   * @param {string} callName 接收数据的全局函数名
   * @param {object} obj 需要参数
   */
  jsonp(url, callName, obj) {
    url += `?cb=${callName}`;
    for (var key in obj) {
      url += `&${key}=${obj[key]}`;
    }
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
    // script只要被创建了就会跳转，因此可以创建之后就删除
    document.body.removeChild(script);
  },

  /**
   * ajax的promise封装
   * @param {object} { method = 'get', url, data, isJSON = true } 
   * @return {object} Promise
   */
  fetch({ method = 'get', url, data, isJSON = true }) {
    let xhr = null;
    try {
      xhr = new XMLHttpRequest();
    } catch (error) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (data) {
      data = this.queryString(data);
    }
    if (method === 'get' && data) {
      url += '?' + data;
    }
    xhr.open(method, url, true);
    if (method === 'get') {
      xhr.send();
    } else {
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let data = isJSON ? JSON.parse(xhr.responseText) : xhr.responseText;
            resolve(data);
          } else {
            reject(xhr.status);
          }
        }
      }
    });
  }
}