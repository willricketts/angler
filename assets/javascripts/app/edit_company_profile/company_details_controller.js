(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    companyDetailsController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('companyDetailsController', definitions);

  function companyDetailsController($scope) {

  }

})(angular);