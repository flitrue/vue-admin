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

var express = require('express')
var apiRouter = express.Router()

require('./user')(apiRouter)
require('./table')(apiRouter)
require('./file')(apiRouter)

module.exports = apiRouter
