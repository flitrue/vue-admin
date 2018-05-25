/**
 * Created by 王平平 on 2017/3/21.
 *
 * 自定义插件
 *
 * @author: 王平平
 * @github: https://github.com/flitrue
 *
 */
import DateFormat from 'plugins/date'

const install = function () {
  if (install.installed) return
  Date.prototype.$DateFormat = DateFormat
}

export default {
  install
}
