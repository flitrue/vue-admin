/**
 * Created by 王平平 on 2017/3/21.
 *
 * @author: 王平平
 * @github: https://github.com/flitrue
 *
 */

export default {
  set_user_info({commit}, {user, is_login}){
    let _user = user === null ? new Object() : user
    commit('SET_USER_INFO', _user)
    commit('SET_USER_LOGIN', is_login)
  },
  set_article_category({commit},category){
      commit("SET_ARTICLE_CATEGORY", category);
  }
}
