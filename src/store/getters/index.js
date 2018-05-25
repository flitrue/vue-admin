/**
 * Created by 王平平 on 2017/3/21.
 *
 * @author: 王平平
 * @github: https://github.com/flitrue
 *
 */

export default {
  get_user_info: state => {
    return {
      user: state.user_info,
      is_login: state.user_login
    }
  },
    get_article_category: state => {
        return state.category
    }
}
