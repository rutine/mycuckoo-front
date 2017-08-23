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
  axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
  
  module.exports = {
      postMenu: function(params) {
        return axios.post('/login/step/third', params).then(response => response.data.data);
      }
  }
}