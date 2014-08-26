(function(angular) {

  var
    dependencies;

  dependencies = [
    'ui.router',
    'pc.Vendor.LoDash',
    'pc.Ajax',
    'pc.Company',
    'pc.User',
    'pc.Snackbar',
    'pc.FileUpload',
    'pc.Validation'
  ];

  angular.module('pc.Wizard', dependencies);

})(angular);