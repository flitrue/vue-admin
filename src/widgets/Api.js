/**
 * Created by WANGPINGPING on 2017/3/4.
 */

import Vue from 'vue';
import VueResource from 'vue-resource';

// Vue.http.options.emulateJSON = true;
// Vue.http.options.emulateHTTP = true;
// Vue.http.options.xhr = { withCredentials: true };//跨域问题

Vue.use(VueResource);

//const rootURI = "http://192.168.31.45:8080";
const rootURI = "http://mis.flitrue.site";

//扩展api添加access_token字段
const Api = {
    request({url="", params= {}, method= "jsonp"}={}){
        return Vue.http[method](url, {
            params: params
        });
    },
    get(opts){
        opts.method = "get";
        return this.request(opts);
    },
    post(opts){
        return Vue.http.post(opts.url, opts.params);
    },
    jsonp(opts){
        return Vue.http.jsonp(opts.url, opts.params);
    }
};

// --------------------------------------登录注册 start---------------------------------------------------


/**
 *  Encapsulate `register` interface
 *
 *  @params {String} name
 *  @params {String} sex
 *  @params {String} brith
 *  @params {String} email
 *  @params {String} depart
 *
 *  @return {Promise} With Register.
 */
export const register = params => {
    return Api.post({
        url: `${rootURI}/api/login/register`,
        params
    });
};

/**
 *  Encapsulate `login` interface
 *
 *  @params {String} email or phone
 *  @params {String} password
 *
 *  @return {Promise} With login.
 */
export const login = params => {
    return Api.jsonp({
        url: `${rootURI}/api/login/login`,
        params
    });
};

/**
 *  Encapsulate `logout` interface
 *
 *  @return {Promise} With logout.
 */
export const logout = params => {
  return Api.jsonp({
    url: `${rootURI}/api/login/logout`,
    params
  });
};

/**
 *  注册第一步
 *  Encapsulate `step1R` interface
 *  @params {String} code
 *
 *  @return {Promise} With step1R.
 */
export const step1R = params => {
    return Api.jsonp({
        url: `${rootURI}/api/login/step1r`,
        params
    });
};

/**
 * 重置密码
 *  Encapsulate `reset` interface
 *
 *  @return {Promise} With reset.
 */
export const reset = params => {
    return Api.jsonp({
        url: `${rootURI}/api/login/reset`,
        params
    });
};


/**
 * 获取用户信息
 *  Encapsulate `info` interface
 *
 *  @return {Promise} With info.
 */
export const info = params => {
    return Api.jsonp({
        url: `${rootURI}/api/user/info`,
        params
    });
};



/**
 *  修改密码
 *  Encapsulate `modifyPwd` interface
 *  @params {String} oldpwd
 *  @params {String} newpwd
 *
 *  @return {Promise} With modifyPwd.
 */
export const modifyPwd = params => {
    return Api.jsonp({
        url: `${rootURI}/api/user/modifypwd`,
        params
    });
};

/**
 *  管理员添加人员
 *  Encapsulate `personAdd` interface
 *  @params {String} name
 *  @params {String} sex
 *  @params {String} email
 *  @params {String} depart
 *  @params {String} brith
 *  @params {String} comment
 *  @params {String} phone
 *
 *  @return {Promise} With personAdd.
 */
export const personAdd = params => {
    return Api.post({
        url: `${rootURI}/api/user/add`,
        params
    });
};

/**
 *  Encapsulate `sendMail` interface
 *  @params {String} email
 *
 *  @return {Promise} With sendMail.
 */
export const sendMail = params => {
    return Api.jsonp({
        url: `${rootURI}/api/login/sendmail`,
        params
    });
};

// --------------------------------------登录注册 end---------------------------------------------------

// --------------------------------------主菜单 start---------------------------------------------------
/**
 * 统计数
 *  Encapsulate `total` interface
 *  @params {String} email
 *
 *  @return {Promise} With sendMail.
 */
export const total = params => {
    return Api.jsonp({
        url: `${rootURI}/api/home/total`,
        params
    });
};

/**
 *  添加心情
 *  Encapsulate `moodAdd` interface
 *  @params {String} context
 *
 *  @return {Promise} With moodAdd.
 */
export const moodAdd = params => {
    return Api.jsonp({
        url: `${rootURI}/api/mood/add`,
        params
    });
};

/**
 *  获取心情
 *  Encapsulate `moodAdd` interface
 *
 *  @return {Promise} With moodAdd.
 */
export const moodInfo = params => {
    return Api.jsonp({
        url: `${rootURI}/api/mood/info`,
        params
    });
};


/**
 *  搜索
 *  Encapsulate `search` interface
 *
 *  @return {Promise} With moodAdd.
 */
export const search = params => {
    return Api.jsonp({
        url: `${rootURI}/api/search/index`,
        params
    });
};


// --------------------------------------主菜单 end---------------------------------------------------

// --------------------------------------人员 start---------------------------------------------------
/**
 * 获取人员树状结构
 *  Encapsulate `name` interface
 *  @params {String} email
 *
 *  @return {Promise} With name.
 */
export const name = params => {
    return Api.jsonp({
        url: `${rootURI}/api/person/name`,
        params
    });
};


/**
 *  获取人员列表
 *  Encapsulate `personInfo` interface
 *
 *  @return {Promise} With personInfo.
 */
export const personInfo = params => {
    return Api.jsonp({
        url: `${rootURI}/api/person/info`,
        params
    });
};

/**
 *  获取员工个人信息
 *  Encapsulate `personOne` interface
 *  @params {Int} uid
 *
 *  @return {Promise} With personOne.
 */
export const personOne = params => {
    return Api.jsonp({
        url: `${rootURI}/api/person/one`,
        params
    });
};


/**
 *  编辑员工个人信息
 *  Encapsulate `personEdit` interface
 *  @params {Int} uid
 *  @params {String} name
 *  @params {String} email
 *  @params {String} depart
 *  @params {String} position
 *  @params {String} brith
 *  @params {String} comment
 *
 *  @return {Promise} With personEdit.
 */
export const personEdit = params => {
    return Api.jsonp({
        url: `${rootURI}/api/person/edit`,
        params
    });
};

/**
 *  导出人员信息到Excel
 *  Encapsulate `personExcel` interface
 *
 *  @return {Promise} With personExcel.
 */
export const personExcel = params => {
    return Api.post({
        url: `${rootURI}/api/person/excel`,
        params
    });
};

/**
 *  发送邮件
 *  Encapsulate `sendEmail` interface
 *  @params {Int} uid
 *  @params {String} subject
 *  @params {String} content
 *
 *  @return {Promise} With sendEmail.
 */
export const sendEmail = params => {
    return Api.jsonp({
        url: `${rootURI}/api/user/sendemail`,
        params
    });
};

/**
 *  设置部门负责人
 *  Encapsulate `setHeader` interface
 *  @params {Int} uid
 *  @params {Int} depart 部门id
 *
 *  @return {Promise} With setHeader.
 */
export const setHeader = params => {
    return Api.jsonp({
        url: `${rootURI}/api/person/setHeader`,
        params
    });
};

/**
 *  我的下属
 *  Encapsulate `under` interface
 *
 *  @return {Promise} With under.
 */
export const under = params => {
    return Api.jsonp({
        url: `${rootURI}/api/person/under`,
        params
    });
};

/**
 *  获取用户头像DataURL
 *  Encapsulate `getDataUrl` interface
 *
 *  @return {Promise} With getDataUrl.
 */
export const getDataUrl = params => {
    return Api.jsonp({
        url: `${rootURI}/api/user/dataurl`,
        params
    });
};


/**
 *  人员状态改变
 *  Encapsulate `getDataUrl` interface
 *
 *  @return {Promise} With getDataUrl.
 */
export const personStatusChange = params => {
    return Api.jsonp({
        url: `${rootURI}/api/person/statusChange`,
        params
    });
};


// --------------------------------------人员 end---------------------------------------------------


// --------------------------------------设备  start---------------------------------------------------

/**
 *  添加设备
 *  Encapsulate `deviceAdd` interface
 *  @params {String} code
 *  @params {String} brand
 *  @params {String} category
 *  @params {String} version
 *  @params {String} price
 *  @params {String} num
 *  @params {String} remarks
 *
 *  @return {Promise} With deviceAdd.
 */
export const deviceAdd = params => {
    return Api.post({
        url: `${rootURI}/api/file/addDevice`,
        params
    });
};

/**
 *  管理员获取设备列表
 *  Encapsulate `deviceInfo` interface
 *
 *  @return {Promise} With deviceInfo.
 */
export const deviceInfo = params => {
    return Api.jsonp({
        url: `${rootURI}/api/device/info`,
        params
    });
};


/**
 *  员工获取设备列表
 *  Encapsulate `deviceInfop` interface
 *  @params {Int} uid
 *
 *  @return {Promise} With deviceInfo.
 */
export const deviceInfop = params => {
    return Api.jsonp({
        url: `${rootURI}/api/device/infop`,
        params
    });
};

/**
 *  获取某一个设备
 *  Encapsulate `deviceDetail` interface
 *  @params {Int} did
 *
 *  @return {Promise} With deviceDetail.
 */
export const deviceDetail = params => {
    return Api.jsonp({
        url: `${rootURI}/api/device/detail`,
        params
    });
};


/**
 *  删除设备
 *  Encapsulate `deviceDel` interface
 *  @params {Int} did
 *
 *  @return {Promise} With deviceDel.
 */
export const deviceDel = params => {
    return Api.post({
        url: `${rootURI}/api/device/del`,
        params
    });
};


/**
 *  编辑设备
 *  Encapsulate `deviceEdit` interface
 *  @params {Int} did
 *  @params {String} code
 *  @params {String} brand
 *  @params {String} category
 *  @params {String} version
 *  @params {String} price
 *  @params {String} num
 *  @params {String} remarks 备注
 *
 *  @return {Promise} With deviceEdit.
 */
export const deviceEdit = params => {
    return Api.post({
        url: `${rootURI}/api/file/editDevice`,
        params
    });
};

/**
 *  设备分配
 *  Encapsulate `deviceTransfer` interface
 *  @params {Int} did
 *  @params {Int} user
 *
 *  @return {Promise} With deviceTransfer.
 */
export const deviceTransfer = params => {
    return Api.jsonp({
        url: `${rootURI}/api/device/transfer`,
        params
    });
};

/**
 *  设备退还
 *  Encapsulate `deviceBack` interface
 *  @params {Int} tid
 *
 *  @return {Promise} With deviceBack.
 */
export const deviceBack = params => {
    return Api.jsonp({
        url: `${rootURI}/api/device/giveback`,
        params
    });
};


// --------------------------------------设备 end---------------------------------------------------


// --------------------------------------文档 start---------------------------------------------------

/**
 *  添加文章
 *  Encapsulate `articleAdd` interface
 *  @params {String} title
 *  @params {String} context
 *  @params {String} category
 *
 *  @return {Promise} With articleAdd.
 */
export const articleAdd = params => {
    return Api.post({
        url: `${rootURI}/api/file/add`,
        params
    });
};

/**
 *  编辑文章
 *  Encapsulate `articleEdit` interface
 *  @params {Int} id
 *  @params {String} title
 *  @params {String} context
 *  @params {String} category
 *
 *  @return {Promise} With articleEdit.
 */
export const articleEdit = params => {
    return Api.post({
        url: `${rootURI}/api/file/edit`,
        params
    });
};

/**
 *  获取文章列表
 *  Encapsulate `articleInfo` interface
 *
 *  @return {Promise} With articleInfo.
 */
export const articleInfo = params => {
    return Api.jsonp({
        url: `${rootURI}/api/article/info`,
        params
    });
};


/**
 *  获取文章详情
 *  Encapsulate `articleDetail` interface
 *  @params {Int} id
 *
 *  @return {Promise} With articleDetail.
 */
export const articleDetail = params => {
    return Api.jsonp({
        url: `${rootURI}/api/article/detail`,
        params
    });
};

/**
 *  删除文章
 *  Encapsulate `articleDel` interface
 *  @params {Int} id
 *
 *  @return {Promise} With articleDel.
 */
export const articleDel = params => {
    return Api.jsonp({
        url: `${rootURI}/api/article/del`,
        params
    });
};


// --------------------------------------文档 end---------------------------------------------------



/**
 * 获取同事印象
 *  Encapsulate `getWordCloud` interface
 *
 *  @return {Promise} With getWordCloud.
 */
export const getWordCloud = params => {
    return Api.jsonp({
        url: `${rootURI}/api/user/getwordcloud`,
        params
    });
};


/**
 * 添加同事印象
 *  Encapsulate `addWordCloud` interface
 *  @params {int} uid
 *  @params {Array} wordcloud
 *
 *  @return {Promise} With addWordCloud.
 */
export const addWordCloud = params => {
    return Api.jsonp({
        url: `${rootURI}/api/user/addwordcloud`,
        params
    });
};

/**
 *  保存用户信息
 *  Encapsulate `save` interface
 *  @params {String} name
 *  @params {String} sex
 *  @params {String} brith
 *
 *  @return {Promise} With save.
 */
export const save = params => {
    return Api.jsonp({
        url: `${rootURI}/api/user/save`,
        params
    });
};

/**
 *  部门类别
 *  Encapsulate `departInfo` interface
 *
 *  @return {Promise} With departInfo.
 */
export const departInfo = params => {
    return Api.jsonp({
        url: `${rootURI}/api/depart/info`,
        params
    });
};

/**
 *  创建相册
 *  Encapsulate `albumCreate` interface
 *  @params {String} name
 *  @params {String} mes
 *  @params {Int} uid
 *  @params {String} img
 *
 *  @return {Promise} With albumCreate.
 */
export const albumCreate = params => {
    return Api.post({
        url: `${rootURI}/api/album/create`,
        params
    });
};

/**
 *  获取相册列表
 *  Encapsulate `albumInfo` interface
 *  @params {Int} uid
 *
 *  @return {Promise} With albumInfo.
 */
export const albumInfo = params => {
    return Api.post({
        url: `${rootURI}/api/album/info`,
        params
    });
};

/**
 *  编辑相册
 *  Encapsulate `albumEdit` interface
 *  @params {Int} aid
 *  @params {String} name
 *  @params {String} mes
 *  @params {String} img
 *
 *  @return {Promise} With albumEdit.
 */
export const albumEdit = params => {
    return Api.post({
        url: `${rootURI}/api/album/edit`,
        params
    });
};

/**
 *  删除相册
 *  Encapsulate `albumDel` interface
 *  @params {Int} aid
 *
 *  @return {Promise} With albumDel.
 */
export const albumDel = params => {
    return Api.post({
        url: `${rootURI}/api/album/del`,
        params
    });
};

/**
 *  获取相册图片集
 *  Encapsulate `albumDetail` interface
 *  @params {Int} aid 相册ID
 *
 *  @return {Promise} With albumDetail.
 */
export const albumDetail = params => {
    return Api.post({
        url: `${rootURI}/api/album/detail`,
        params
    });
};


/**
 *  删除相片
 *  Encapsulate `photoDel` interface
 *  @params {Int} pid 相片ID
 *
 *  @return {Promise} With photoDel.
 */
export const photoDel = params => {
    return Api.post({
        url: `${rootURI}/api/album/delPhoto`,
        params
    });
};

/**
 *  相册类别
 *  Encapsulate `albumCategory` interface
 *  @params {Int} uid
 *
 *  @return {Promise} With albumCategory.
 */
export const albumCategory = params => {
    return Api.post({
        url: `${rootURI}/api/album/category`,
        params
    });
};

/**
 *  上传图片
 *  Encapsulate `photoAdd` interface
 *  @params {Int} aid
 *  @params {Array} imglist
 *
 *  @return {Promise} With photoAdd.
 */
export const photoAdd = params => {
    return Api.post({
        url: `${rootURI}/api/album/add`,
        params
    });
};


// --------------------------------------申请 start---------------------------------------------------

/**
 *  添加申请
 *  Encapsulate `deviceAdd` interface
 *  @params {Array} category
 *  @params {String} desc
 *
 *  @return {Promise} With deviceAdd.
 */
export const applyAdd = params => {
    return Api.jsonp({
        url: `${rootURI}/api/apply/add`,
        params
    });
}
/**
 *  设备维修申请
 *  Encapsulate `deviceRepair` interface
 *  @params {Int} did
 *  @params {String} desc
 *
 *  @return {Promise} With deviceRepair.
 */
export const deviceRepair = params => {
    return Api.jsonp({
        url: `${rootURI}/api/apply/repair`,
        params
    });
}


/**
 *  获取我的申请
 *  Encapsulate `applyInfo` interface
 *
 *  @return {Promise} With applyInfo.
 */
export const applyInfo = params => {
    return Api.jsonp({
        url: `${rootURI}/api/apply/info`,
        params
    });
}

/**
 *  获取设备申请信息
 *  Encapsulate `applyInfoA` interface
 *
 *  @return {Promise} With applyInfoA.
 */
export const applyInfoA = params => {
    return Api.jsonp({
        url: `${rootURI}/api/apply/infoa`,
        params
    });
}

/**
 *  获取维修申请信息
 *  Encapsulate `getRepair` interface
 *
 *  @return {Promise} With getRepair.
 */
export const getRepair = params => {
    return Api.jsonp({
        url: `${rootURI}/api/apply/getRepair`,
        params
    });
}

/**
 *  改变设备申请状态
 *  Encapsulate `applyChange` interface
 *
 *  @return {Promise} With applyChange.
 */
export const applyChange = params => {
    return Api.jsonp({
        url: `${rootURI}/api/apply/change`,
        params
    });
}

/**
 *  改变维修申请状态
 *  Encapsulate `changeRepair` interface
 *
 *  @return {Promise} With changeRepair.
 */
export const changeRepair = params => {
    return Api.jsonp({
        url: `${rootURI}/api/apply/changeRepair`,
        params
    });
}

// --------------------------------------申请 end---------------------------------------------------


// --------------------------------------分享 start---------------------------------------------------


/**
 *  获取资源共享信息
 *  Encapsulate `shareIndex` interface
 *
 *  @return {Promise} With shareIndex.
 */
export const shareIndex = params => {
    return Api.jsonp({
        url: `${rootURI}/api/share/index`,
        params
    });
}

/**
 *  获取我的分享信息
 *  Encapsulate `shareInfo` interface
 *
 *  @return {Promise} With shareInfo.
 */
export const shareInfo = params => {
    return Api.jsonp({
        url: `${rootURI}/api/share/info`,
        params
    });
}

/**
 *  设为分享
 *  Encapsulate `share` interface
 *
 *  @return {Promise} With share.
 */
export const share = params => {
    return Api.jsonp({
        url: `${rootURI}/api/share/share`,
        params
    });
}

/**
 *  取消分享
 *  Encapsulate `cancelShare` interface
 *
 *  @return {Promise} With cancelShare.
 */
export const cancelShare = params => {
    return Api.jsonp({
        url: `${rootURI}/api/share/cancelShare`,
        params
    });
}

// --------------------------------------分享 end---------------------------------------------------

// --------------------------------------报表 start---------------------------------------------------
/**
 *  设备资产额统计
 *  Encapsulate `deviceAssetsCount` interface
 *
 *  @return {Promise} With deviceAssetsCount.
 */
export const deviceAssetsCount = params => {
    return Api.jsonp({
        url: `${rootURI}/api/charts/assetscount`,
        params
    });
};

/**
 *  文档个数统计
 *  Encapsulate `chartsArticleCount` interface
 *
 *  @return {Promise} With chartsArticleCount.
 */
export const chartsArticleCount = params => {
    return Api.jsonp({
        url: `${rootURI}/api/charts/articlecount`,
        params
    });
};

/**
 *  男女比例
 *  Encapsulate `chartsSexScale` interface
 *
 *  @return {Promise} With chartsSexScale.
 */
export const chartsSexScale = params => {
    return Api.jsonp({
        url: `${rootURI}/api/charts/sexScale`,
        params
    });
};

// --------------------------------------报表 end---------------------------------------------------
