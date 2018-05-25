/**
 * Created by 王平平 on 2017/3/21.
 *
 * @author: 王平平
 * @github: https://github.com/flitrue
 *
 */

export default {
  //设置用户信息
  SET_USER_INFO(state, status){
    state.user_info = status
  },
  //设置用户是否登录
  SET_USER_LOGIN(state, status){
    state.user_login = status
  },
    //设置用户选择的文档类型
    SET_ARTICLE_CATEGORY(state, category){
    state.category = category
  }
}
