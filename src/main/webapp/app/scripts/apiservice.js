'use strict';

angular.module('spicepadApp')
  .service('apiService', ['$http', function ($http) {
    var base = '../rest/';
    return {
      register : function (registerRequest) {
           return $http.post(base + 'register/new', registerRequest);
         },
      addMessage : function (messageRequest) {
          return $http.get(base + 'message/new', messageRequest);
        }
      };
    }]
    );
