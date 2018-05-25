/**
 * Created by 王平平 on 2017/4/24.
 *
 * 状态管理器
 *
 * @author: 王平平
 * @github: https://github.com/flitrue
 *
 */

import Vue from 'vue'
import Vuex from 'vuex'

//引入模块
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './states'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
