(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    'ajaxService',
    'companyService',
    'FILE_EVENTS',
    registrationCompanyInformationController
  ];

  angular.module('pc.Registration')
    .controller('registrationCompanyInformationController', definitions);

  function registrationCompanyInformationController($scope, $state, ajax, company, FILE_EVENTS) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.companyInformation = initCompanyInformation();

    $scope.isSupplier = company.get('supplier');

    $scope.$on(FILE_EVENTS.SELECTED, onImageSelected);

    $scope.submitCompanyInformation = submitCompanyInformation;

    function onImageSelected(e, file, dataUrl) {
      $scope.companyInformation.logo.file = file;
      $scope.companyInformation.logo.url = dataUrl;
      $scope.$digest();
    }

    function submitCompanyInformation() {
      if ($scope.companyInformationForm.$valid) {
        ajax.post('/views/api/create_company.json', $scope.companyInformation)
          .then(company.setAll)
          .then(goToEmailVerification);
      }
    }

    function goToEmailVerification() {
      $state.go('registration.email_verification');
    }

    function initCompanyInformation() {
      return {
        name: company.get('name'),
        email: company.get('email'),
        phoneNumberCountryCode: company.get('phoneNumberCountryCode'),
        phoneNumber: company.get('phoneNumber'),
        type: company.get('type'),
        location: company.get('location'),
        primaryLanguage: company.get('primaryLanguage'),
        website: company.get('website'),
        logo: company.get('logo') || {},
        dba: company.get('dba'),
        industry: company.get('industry'),
        annualSales: company.get('annualSales'),
        productSpecialties: company.get('productSpecialties') || []
      };
    }

  }

})(angular);