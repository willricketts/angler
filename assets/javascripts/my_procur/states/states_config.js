(function(angular) {
  var
    definition;

  definition = [
    '$stateProvider',
    '$urlRouterProvider',
    statesConfig
  ];

  angular.module('pc.MyProcur.States')
    .config(definition);

  function statesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        views: {
          '': {
            templateUrl: 'dashboard.html',
            controller: 'dashboardController'
          },
          'header': {
            templateUrl: 'my_procur.html',
            controller: 'myProcurController'
          }
        }
      })

      .state('view_company_profile', {
        url: '/view_company_profile',
        views: {
          '': {
            templateUrl: 'view_company_profile.html',
            controller: 'viewCompanyProfileController',
            abstract: true
          },
          'header': {
            templateUrl: 'public_view.html',
            controller: 'myProcurController'
          }
        }
      })
      .state('view_company_profile.view_company_description', {
        url: '/view_company_description',
        templateUrl: 'view_company_profile_description.html',
        controller: 'viewCompanyProfileDescriptionController'
      })
      .state('view_company_profile.view-company_interests', {
        url: '/view_company_interests',
        templateUrl: 'view_company_profile_interests.html',
        controller: 'viewCompanyProfileInterestsController'
      })



      .state('user_account_settings', {
        url: '/user_account_settings',
        abstract: true,
        views: {
          '': {
            templateUrl: 'user_account_settings.html',
            controller: 'userAccountSettingsController'
          },
          'header': {
            templateUrl: 'my_procur.html',
            controller: 'myProcurController'
          }
        }
      })
      .state('user_account_settings.update_settings', {
        url: '/update_settings',
        templateUrl: 'user_update_settings.html',
        controller: 'userUpdateSettingsController'
      })
      .state('user_account_settings.update_password', {
        url: '/update_password',
        templateUrl: 'user_update_password.html',
        controller: 'userUpdatePasswordController'
      })

      .state('edit_company_profile', {
        url: '/edit_company_profile',
        abstract: true,
        views: {
          '': {
            templateUrl: 'edit_company_profile.html',
            controller: 'editCompanyProfileController'
          },
          header: {
            templateUrl: 'my_procur.html',
            controller: 'myProcurController'
          }
        }
      })
      .state('edit_company_profile.company_details', {
        url: '/company_details',
        templateUrl: 'company_details.html',
        controller: 'companyDetailsController'
      })
      .state('edit_company_profile.company_information', {
        url: '/company_information',
        templateUrl: 'company_information.html',
        controller: 'companyInformationController'
      })
      .state('edit_company_profile.production_details', {
        url: '/production_details',
        templateUrl: 'production_details.html',
        controller: 'productionDetailsController'
      })
      .state('edit_company_profile.descriptions', {
        url: '/descriptions',
        templateUrl: 'descriptions.html',
        controller: 'descriptionsController'
      })
      .state('edit_company_profile.preferences', {
        url: '/preferences',
        templateUrl: 'preferences.html',
        controller: 'preferencesController'
      })
      .state('edit_company_profile.social_media', {
        url: '/social_media',
        templateUrl: 'social_media.html',
        controller: 'socialMediaController'
      })
      .state('edit_company_profile.photos', {
        url: '/photos',
        templateUrl: 'photos.html',
        controller: 'photosController'
      });

  }


})(angular);
