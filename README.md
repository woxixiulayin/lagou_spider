####简介
搜索拉勾网上的招聘信息
展示地址：[http://120.76.29.108/](http://120.76.29.108/:8082)

####使用方法
npm install --dev-save
node app.js
打开[http://localhost:8082/](http://localhost:8082/)

####技术栈
koa\mongodb\gulp\爬虫

####说明
> 1.后端根据查询的城市和职位，现在mongodb中查找
> 2.数据不存在或者是24小时前的数据，则重新爬取新的数据
> 3.将数据转成json返回到其端用Echat图标来显示