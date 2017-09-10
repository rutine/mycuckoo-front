const host = 'http://localhost:8080';

const mycuckoo = {
  login: {
    firstStepUrl: host + '/login/step/first',
    secondStepUrl: host + '/login/step/second',
    thirdStepUrl: host + '/login/step/third',
  }
}

if(exports) {
  const axios = require('axios');
  axios.defaults.baseURL = host;
  axios.defaults.withCredentials = true
  axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

  //返回状态判断(添加响应拦截器)
  axios.interceptors.response.use((res) => {
    if(res.data.code == 405) {//未登录
      window.location = '/view/login.html';
    }
    // else if(res.data.code != 200) {
    //   MyCuckoo.showMsg({state: 'danger', title: '提示', msg: res.data.message});
    // }

    return res;
  }, (error) => {
    MyCuckoo.showMsg({state: 'danger', title: '提示', msg: error.response.data.message});
    return Promise.reject(error);
  });
  
  module.exports = {
    getLogout: function() {
      return axios.post('/login/logout').then(res => res.data.data);
    },
    postMenu: function(params) {
      return axios.post('/login/step/third', params).then(res => res.data.data);
    },
    postUploadLogo: host + '/uum/user/mgr/upload/photo',

    organMgr: {
      getChildNodes: function(params) {
        return axios.get('/uum/organ/mgr/get/child/nodes', {params: params}).then(res => res.data.data);
      },
    },
    userMgr: {
      getChildNodes: function(params) {
        return axios.get('/uum/user/mgr/get/child/nodes', {params: params}).then(res => res.data.data);
      },
      list: function(params) {
        return axios.get('/uum/user/mgr/list', {params: params}).then(res => res.data.data);
      },
      create: function(params) {
        return axios.post('/uum/user/mgr/create', params).then(res => res.data.data);
      },
      update: function(params) {
        return axios.post('/uum/user/mgr/update', params).then(res => res.data.data);
      },
      view: function(params) {
        return axios.get('/uum/user/mgr/view', {params: params}).then(res => res.data.data);
      },
      del: function(params) {
        return axios.get('/uum/user/mgr/delete', {params: params}).then(res => res.data.data);
      },
      disEnable: function(params) {
        return axios.get('/uum/user/mgr/disEnable', {params: params}).then(res => res.data.data);
      },
      resetPwd: function(params) {
        return axios.get('/uum/user/mgr/reset/password', {params: params}).then(res => res.data.data);
      },
      listRolePrivilege: function(params) {
        return axios.get('/uum/user/mgr/list/role/privilege', {params: params}).then(res => res.data.data);
      },
      listUserPrivilege: function(params) {
        return axios.get('/uum/user/mgr/list/user/privilege', {params: params}).then(res => res.data.data);
      },
      listRowPrivilege: function(params) {
        return axios.get('/uum/user/mgr/list/row/privilege', {params: params}).then(res => res.data.data);
      },
      saveRolePrivilege: function(params) {
        return axios.get('/uum/user/mgr/save/role/privilege', {params: params}).then(res => res.data.data);
      },
      saveOperationPrivilege: function(params) {
        return axios.get('/uum/user/mgr/save/operation/privilege', {params: params}).then(res => res.data.data);
      },
      saveRowPrivilege: function(params) {
        return axios.get('/uum/user/mgr/save/row/privilege', {params: params}).then(res => res.data.data);
      },
      queryUsers: function(params) {
        return axios.get('/uum/user/mgr/query/users', {params: params}).then(res => res.data.data);
      }
    },
  }
}