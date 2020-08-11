# 商品管理系统

## 使用技术

* HTML5 + CSS3
* JavaScript
* Ajax + json
* bootstrap
* jquery
* PHP
* Mysql

## 主要功能
## login分支

1. 展示所有商品
2. 商品编辑
3. 商品删除
4. 商品添加
5. 登录
6. 注册

## 接口文档

### 获取所有商品

url:  api/shop/select.php

query:  null

method: GET

response: {

​	code: 200,

​	body: {

​		list: [

​			{ id, name, price, num }

​		]

​	}

}