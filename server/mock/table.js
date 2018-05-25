/**
 * Created by 王平平 on 2017/3/23.
 *
 * @author: 王平平
 * @github: https://github.com/zzmhot
 * @email: 812863096@qq.com
 * @Date: 2017/3/23 18:19
 * @Copyright(©) 2017 by 王平平.
 *
 */

var Mock = require('mockjs')
var port_code = require('../../src/common/port_uri').port_code

// 姓名	性别	年龄	生日	地址

var data_list = [{
  'id|10-100': 1,
  "name": "@cname",
  "sex": "@pick([1, 2])",//1男，2女
  'age|20-25': 20,
  "birthday": "@date('yyyy-MM-dd')",
  "address": "@county(true)",
  "zip": "@zip"
}]

exports.list = Mock.mock({
  code: port_code.success,
  msg: "获取成功",
  "data|15": data_list,
  page: 1,
  "total|50-200": 50
})

exports.get = Mock.mock({
  code: port_code.success,
  msg: "获取成功",
  data: data_list[0]
})

exports.del = Mock.mock({
  code: port_code.success,
  msg: "删除成功"
})

exports.save = Mock.mock({
  code: port_code.success,
  msg: "操作成功"
})

exports.batch_del = Mock.mock({
  code: port_code.success,
  msg: "批量删除成功"
})
