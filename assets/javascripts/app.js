
// assets/javascripts/app/third_party/lodash_module.js
(function(angular) {

  var
    dependencies = [];

  angular.module('pc.ThirdParty.LoDash', dependencies)
    .factory('_', lodashFactory);

  function lodashFactory() { return window._; }

})(angular);

// assets/javascripts/app/ajax/ajax_module.js
(function(global, angular) {

  var
    dependencies;

  dependencies = [];

  angular.module('pc.Ajax', dependencies);

})(window, angular);

// assets/javascripts/app/ajax/ajax_service.js
(function(angular) {
  var
    definition;

  definition = [
    '$http',
    ajaxService
  ];

  angular.module('pc.Ajax')
    .factory('ajaxService', definition);

  function ajaxService($http) {
    return {
      get: get,
      post: post,
      put: put,
      destroy: destroy
    };

    function get(endpoint) {
      return $http.get(endpoint)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function post(endpoint, data) {
      return $http.post(endpoint, data)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function put(endpoint, data) {
      return $http.put(endpoint, data)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function destroy(endpoint) {
      return $http['delete'](endpoint)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function resolveResponse(response) {
      return response.data;
    }

    function handleError(err) {
      console.log('There was an error!', err);
    }
  }

})(angular);

// assets/javascripts/app/company/company_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [

  ];

  angular.module('pc.Company', dependencies);

})(angular);

// assets/javascripts/app/company/company_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    companyService
  ];

  angular.module('pc.Company')
    .factory('companyService', definitions);

  function companyService($window) {
    var
      company;

    company = $window.pc.localData.company;

    return company;
  }

})(angular);

// assets/javascripts/app/buyer_supplier/buyer_supplier_module.js
(function(angular) {

  var
    dependencies = [];

  angular.module('pc.BuyerSupplier', dependencies);

})(angular);

// assets/javascripts/app/buyer_supplier/buyer_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    buyerService
  ];

  angular.module('pc.BuyerSupplier')
    .factory('buyerService', definitions);

  function buyerService($window) {
    var
      buyer;

    buyer = $window.pc.localData.buyer || {};

    return buyer;

  }

})(angular);

// assets/javascripts/app/buyer_supplier/supplier_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    supplierService
  ];

  angular.module('pc.BuyerSupplier')
    .factory('supplierService', definitions);

  function supplierService($window) {
    var
      supplier;

    supplier = $window.pc.localData.supplier || {};

    return supplier;

  }

})(angular);

// assets/javascripts/app/user/user_module.js
(function(angular) {
  var
    dependencies;

  dependencies = [
    'pc.ThirdParty.LoDash',
    'pc.Company',
    'pc.BuyerSupplier'
  ];

  angular.module('pc.User', dependencies);

})(angular);

// assets/javascripts/app/user/user_header_directive.js
(function(angular) {

  var
    definitions;

  definitions = [
    userHeaderDirective
  ];

  angular.module('pc.User')
    .directive('pcUserHeader', definitions);

  function userHeaderDirective() {
    var
      definitions;

    definitions = [
      '$scope',
      'userService',
      'companyService',
      controller
    ];

    return {
      restrict: 'AC',
      controller: definitions,
      templateUrl: 'user_header.html',
      scope: {}
    };

    function controller($scope, user, company) {
      $scope.user = user;
      $scope.company = company;
    }

  }

})(angular);

// assets/javascripts/app/user/user_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    'companyService',
    'buyerService',
    'supplierService',
    userService
  ];

  angular.module('pc.User')
    .factory('userService', definitions);

  function userService($window) {
    var
      user;

    user = $window.pc.localData.user;

    user.inactiveMode = setInactiveMode();
    user.toggleActiveMode = toggleActiveMode;
    user.isBuyerMode = isBuyerMode;
    user.isSupplierMode = isSupplierMode;

    return user;

    function toggleActiveMode() {
      var
        active = user.activeMode,
        inactive = user.inactiveMode;

      user.activeMode = inactive;
      user.inactiveMode = active;
    }

    function isBuyerMode() {
      return user.activeMode === 'buyer';
    }

    function isSupplierMode() {
      return user.activeMode === 'supplier';
    }

    function setInactiveMode() {
      if (user.activeMode === 'buyer') {
        return 'supplier';
      }
      else if (user.activeMode === 'supplier') {
        return 'buyer';
      }
    }
  }

})(angular);

// assets/javascripts/app/nav/nav_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [];

   angular.module('pc.Nav', dependencies);

})(angular);

// assets/javascripts/app/nav/nav_directive.js
(function(angular) {

  var
    definitions;

  definitions = [
    navDirective
  ];

  angular.module('pc.Nav')
    .directive('pcNav', definitions);

  function navDirective() {

    return {
      restrict: 'AC',
      link: linker,
      scope: {
        state: '@pcNav'
      }
    };

    function linker(scope, element, attrs) {
      scope.$on('$stateChangeSuccess', setActiveNav);

      function setActiveNav(event, toState, toParams, fromState, fromParams) {
        if (toState.name.indexOf(scope.state) >= 0) {
          element.addClass('active');
        }
        else {
          element.removeClass('active');
        }
      }
    }

  }

})(angular);

// assets/javascripts/app/dashboard/dashboard_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.User',
    'pc.Company',
    'pc.BuyerSupplier'
  ];

  angular.module('pc.Dashboard', dependencies);

})(angular);

// assets/javascripts/app/dashboard/action_items_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    'userService',
    'companyService',
    'buyerService',
    'supplierService',
    actionItemsService
  ];

  angular.module('pc.Dashboard')
    .factory('actionItemsService', definitions);

  function actionItemsService(user, company, buyer, supplier) {
    return {
      get: get,
      activeMode: activeMode
    };

    function get() {
      var
        actionItems;

      actionItems = [
        {
          action: 'Upload a user photo',
          complete: !!user.image,
          type: {
            buyer: true,
            supplier: true
          },
          link: 'user_account_settings'
        },
        {
          action: 'Update your job title',
          complete: !!user.jobTitle,
          type: {
            buyer: true,
            supplier: true
          },
          link: 'user_account_settings'
        },
        {
          action: 'Add your company website',
          complete: !!company.website,
          type: {
            buyer: true,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your company description',
          complete: user.isBuyerMode() ? !!buyer.companyDescription : !!supplier.companyDescription,
          type: {
            buyer: true,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your company\'s Statements of Responsibility',
          complete: user.isBuyerMode() ?
            !!(buyer.responsibilityStatements.environmentalSustainability && buyer.responsibilityStatements.qualitySourcing && buyer.responsibilityStatements.workplaceSafety && buyer.responsibilityStatements.laborEducationTraining && buyer.responsibilityStatements.reinvestment) :
            !!(supplier.responsibilityStatements.environmentalSustainability && supplier.responsibilityStatements.qualitySourcing && supplier.responsibilityStatements.workplaceSafety && supplier.responsibilityStatements.laborEducationTraining && supplier.responsibilityStatements.reinvestment),
          type: {
            buyer: true,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your preferred buyer type',
          complete: !!supplier.tradePreferences.preferredBuyerType,
          type: {
            buyer: false,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your preferred supplier type',
          complete: !!buyer.tradePreferences.preferredSupplierType,
          type: {
            buyer: true,
            supplier: false
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your products of interest',
          complete: !!buyer.productCategories.length,
          type: {
            buyer: true,
            supplier: false
          },
          link: 'edit_company_profile'
        }
      ];

      return actionItems;
    }

    function activeMode() {
      return filterActiveMode;

      function filterActiveMode(actionItem) {
        return actionItem.type[user.activeMode];
      }
    }
  }
})(angular);

// assets/javascripts/app/dashboard/dashboard_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    'actionItemsService',
    dashboardController
  ];

  angular.module('pc.Dashboard')
    .controller('dashboardController', definitions);

  function dashboardController($scope, user, company, actionItems) {
    $scope.user = user;
    $scope.user.createdYear = new Date($scope.user.createdAt).getFullYear();

    $scope.company = company;

    $scope.actionItems = actionItems.get();
    $scope.activeModeFilter = actionItems.activeMode;
  }

})(angular);

// assets/javascripts/app/user_account_settings/user_account_settings_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.User'
  ];

  angular.module('pc.UserAccountSettings', dependencies);

})(angular);

// assets/javascripts/app/user_account_settings/user_account_settings_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'user',
    userAccountSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userAccountSettingsController', definitions);

  function userAccountSettingsController($scope, user) {
    $scope.user = user;

  }

})(angular);

// assets/javascripts/app/user_account_settings/user_update_password_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    userUpdatePassword
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdatePassword', definitions);

  function userUpdatePassword($scope) {
    
  }

})(angular);

// assets/javascripts/app/user_account_settings/user_update_settings_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    userUpdateSettings
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdateSettings', definitions);

  function userUpdateSettings($scope) {
    
  }

})(angular);

// assets/javascripts/app/edit_company_profile/edit_company_profile_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.User'
  ];

  angular.module('pc.EditCompanyProfile', dependencies);

})(angular);

// assets/javascripts/app/edit_company_profile/company_details_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    companyDetails
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('companyDetails', definitions);

  function companyDetails($scope) {
    
  }

})(angular);

// assets/javascripts/app/edit_company_profile/company_information_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    companyInformation
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('companyInformation', definitions);

  function companyInformation($scope) {
    
  }

})(angular);

// assets/javascripts/app/edit_company_profile/descriptions.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    descriptions
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('descriptions', definitions);

  function descriptions($scope) {
    
  }

})(angular);

// assets/javascripts/app/edit_company_profile/edit_company_profile_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'user',
    'company',
    editCompanyProfileController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('editCompanyProfileController', definitions);

  function editCompanyProfileController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
  }

})(angular);

// assets/javascripts/app/edit_company_profile/photos.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    photos
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('photos', definitions);

  function photos($scope) {
    
  }

})(angular);

// assets/javascripts/app/edit_company_profile/preferences.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    preferences
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('preferences', definitions);

  function preferences($scope) {
    
  }

})(angular);

// assets/javascripts/app/edit_company_profile/production_details.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    productionDetails
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('productionDetails', definitions);

  function productionDetails($scope) {
    
  }

})(angular);

// assets/javascripts/app/edit_company_profile/social_media.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    socialMedia
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('socialMedia', definitions);

  function socialMedia($scope) {
    
  }

})(angular);

// assets/javascripts/app/states/states_module.js
(function(angular) {
  var
    dependencies;

  dependencies = [
    'ui.router'
  ];

  angular.module('pc.States', dependencies);

})(angular);

// assets/javascripts/app/states/states_config.js
(function(angular) {
  var
    definition;

  definition = [
    '$stateProvider',
    '$urlRouterProvider',
    statesConfig
  ];

  angular.module('pc.States')
    .config(definition);

  function statesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard.html',
        controller: 'dashboardController'
      })
      .state('user_account_settings', {
        url: '/user_account_settings',
        templateUrl: 'user_account_settings.html',
        controller: 'userAccountSettingsController',
        resolve: {
          user: user
        },
        abstract: true
      })
      .state('user_account_settings.update_settings', {
        url: '/update_settings',
        templateUrl: 'user_update_settings.html',
        controller: 'userUpdateSettings'
      })
      .state('user_account_settings.update_password', {
        url: '/update_password',
        templateUrl: 'user_update_password.html',
        controller: 'userUpdatePassword'
      })
      .state('edit_company_profile', {
        url: '/edit_company_profile',
        templateUrl: 'edit_company_profile.html',
        controller: 'editCompanyProfileController',
        resolve: {
          user: user,
          company: company
        },
        abstract: true
      })
      .state('edit_company_profile.company_details', {
        url: '/company_details',
        templateUrl: 'company_details.html',
        controller: 'companyDetails'
      })
      .state('edit_company_profile.company_information', {
        url: '/company_information',
        templateUrl: 'company_information.html',
        controller: 'companyInformation'
      })
      .state('edit_company_profile.production_details', {
        url: '/production_details',
        templateUrl: 'production_details.html',
        controller: 'productionDetails'
      })
      .state('edit_company_profile.descriptions', {
        url: '/descriptions',
        templateUrl: 'descriptions.html',
        controller: 'descriptions'
      })
      .state('edit_company_profile.preferences', {
        url: '/preferences',
        templateUrl: 'preferences.html',
        controller: 'preferences'
      })
      .state('edit_company_profile.social_media', {
        url: '/social_media',
        templateUrl: 'social_media.html',
        controller: 'socialMedia'
      })
      .state('edit_company_profile.photos', {
        url: '/photos',
        templateUrl: 'photos.html',
        controller: 'photos'
      });

  }


})(angular);

// assets/javascripts/app/templates_module.js
angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row dashboard\"><div class=\"col-xs-4\"><div class=\"row user-profile\"><div class=\"col-xs-4\"><img ng-src=\"{{user.image}}\"></div><div class=\"col-xs-8\"><h4 class=\"text-muted profile-name\">{{user.firstName}} {{user.lastName}}</h4><h5 class=\"company-name\">{{company.name}}</h5><h6 class=\"member-since\">Procur member since {{user.createdYear}}</h6></div></div><div class=\"row\"><div class=\"col-xs-12 sub-nav\"><ul class=\"list-separator\"><li><a ui-sref=\"#\"><i class=\"glyphicon glyphicon-cog\"></i> Edit User Account Settings</a></li><li><a ui-sref=\"#\"><i class=\"glyphicon glyphicon-new-window\"></i> View My Company Profile</a></li></ul></div></div><div class=\"row\"><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Company</li><li><a href=\"https://procur.com/earlyaccess\">Early Access</a></li><li><a href=\"https://procur.com/features\">Upcoming Features</a></li><li><a href=\"https://procur.com/pricing\">Membership & Pricing</a></li><li><a href=\"https://procur.com/about\">About Procur</a></li></ul></div><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Help & Support</li><li><a href=\"https://procur.com/faq\">FAQ</a></li><li><a href=\"https://procur.com/contact\">Contact Us</a></li><li><a href=\"https://procur.com/support\">Support Topics</a></li><li><a href=\"mailto:support@procur.com\">Email Support</a></li></ul></div></div></div><div class=\"col-xs-5\"><div class=\"panel-content action-items\"><div class=\"panel-heading\"><h5>My Procur Action Items</h5></div><div class=\"panel-body\"><p class=\"lead\">Welcome to Procur Early Access!</p><p>We're inviting select users to register with Procur before opening up our full platform later this summer. During Early Access, account holders will be able to create company profiles, organize products and RFQs, and start engaging with our online community. When we launch our full platform, Early Access suppliers will be the first to connect with global retailers, resellers and distributors looking to fill sourcing requirements.</p><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Learn more about early access</a></div><div class=\"panel-footer\"><ul class=\"list-checklist\"><li ng-repeat=\"item in actionItems | filter:activeModeFilter()\" ng-class=\"{complete: item.complete, incomplete: !item.complete}\"><span ng-switch=\"item.complete\"><span ng-switch-when=\"false\"><a ui-sref=\"{{item.link}}\"><i class=\"glyphicon glyphicon-unchecked\"></i><h5>{{item.action}}</h5></a></span> <span ng-switch-when=\"true\"><i class=\"glyphicon glyphicon-check\"></i><h5>{{item.action}}</h5></span></span></li></ul></div></div></div><div class=\"col-xs-2\"></div></div>"
  );


  $templateCache.put('company_details.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Basic Company Details</h4></div><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Company Name*</label><input type=\"text\" id=\"companyName\" placeholder=\"Company Name\" value=\"{{company.name}}\"></div><div class=\"form-group\"><label for=\"\">Company Phone*</label><input type=\"text\" placeholder=\"Country Code*\" value=\"{{company.phone.countryCode}}\"> <input type=\"text\" placeholder=\"Phone Number*\" value=\"{{company.phone.number}}\"> <input type=\"text\" placeholder=\"Ext. Number\" value=\"{{company.phone.extension}}\"></div><div class=\"form-group\"><label for=\"\">Company Fax</label><input type=\"text\" placeholder=\"Country Code\" value=\"{{company.fax.countryCode}}\"> <input type=\"text\" placeholder=\"Fax Number\" value=\"{{company.fax.number}}\"> <input type=\"text\" placeholder=\"Ext. Number\" value=\"{{company.fax.extension}}\"></div><div class=\"form-group\"><label for=\"email\">Company Email Address*</label><input type=\"text\" id=\"email\" placeholder=\"info@mycompanyname.com\" value=\"{{company.email}}\"></div><div class=\"form-group\"><label for=\"website\">Official Company Website</label><input type=\"text\" id=\"website\" placeholder=\"www.mycompanyname.com\" value=\"{{company.website}}\"></div><div class=\"form-group\"><label for=\"industry\">Industry*</label><input type=\"text\" id=\"industry\" placeholder=\"dropdown!\" value=\"\"><!-- change to dropdown --></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Official Business Address*</label><input type=\"text\" placeholder=\"Address Line #1\" value=\"{{company.addresses.primary['address-1']}}\"> <input type=\"text\" placeholder=\"Address Line #2\" value=\"{{company.addresses.primary['address-2']}}\"> <input type=\"text\" placeholder=\"Select Country\" value=\"{{company.addresses.primary.country}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"{{company.addresses.primary.state}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" value=\"{{company.addresses.primary.city}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Postal Code\" value=\"{{company.addresses.primary.postalCode}}\"></div><div class=\"form-group\"><label for=\"\">Is the above address a headquarters?</label><input type=\"checkbox\" name=\"\"><span>Yes; please copy address below.</span></div><div class=\"form-group\"><label for=\"\">Company Headquarters Address*</label><input type=\"text\" placeholder=\"Address Line #1\" value=\"{{company.addresses.headquarters['address-1']}}\"> <input type=\"text\" placeholder=\"Address Line #2\" value=\"{{company.addresses.headquarters['address-2']}}\"> <input type=\"text\" placeholder=\"Select Country\" value=\"{{company.addresses.headquarters.country}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"{{company.addresses.headquarters.state}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" value=\"{{company.addresses.headquarters.city}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Postal Code\" value=\"{{company.addresses.headquarters.postalCode}}\"></div><div class=\"form-group\"><label for=\"employeeCount\">Total Number of Employees*</label><input type=\"text\" id=\"employeeCount\" placeholder=\"dropdown!\" value=\"\"><!-- change to dropdown --></div></div></div></form></div>"
  );


  $templateCache.put('company_information.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>[activeMode] Information</h4></div><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Logo Image</label><img ng-src=\"http://res.cloudinary.com/huewqecyr/image/upload/v1404414400/dhemkcar246mvbm8wmcs.jpg\"> <input type=\"file\"> <input type=\"submit\" value=\"Update Logo Image\"></div><div class=\"form-group\"><label for=\"\">Type of Company</label><input type=\"text\" placeholder=\"City\" value=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Contact Name</label><input type=\"text\" id=\"\" placeholder=\"Contact Name\" value=\"\"></div><div class=\"form-group\"><label for=\"\">Contact Position</label><input type=\"text\" id=\"\" placeholder=\"Contact Position\" value=\"\"></div><div class=\"form-group\"><label for=\"\">Contact Email</label><input type=\"text\" id=\"\" placeholder=\"Contact Email\" value=\"\"></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">Private Labeler</label><input type=\"checkbox\" id=\"\" placeholder=\"Private Labeler\" value=\"\"><span>Private labeling</span></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">GSA Approved Supplier</label><input type=\"checkbox\" id=\"\" placeholder=\"GSA Approved Supplier\" value=\"\"><span>GSA Approved Supplier</span></div><div class=\"form-group\"><label for=\"\">DUNS Number</label><input type=\"text\" id=\"\" placeholder=\"DUNS Number\" value=\"\"></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">CAGE Code</label><input type=\"text\" id=\"\" placeholder=\"CAGE Code\" value=\"\"></div><div class=\"form-group\"><!-- BUYER ONLY --><label for=\"\">Secondary Location</label><input type=\"text\" placeholder=\"Location Title\" value=\"\"> <input type=\"text\" placeholder=\"Select Location Type\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Country\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" value=\"\"></div><div class=\"form-group\"><!-- BUYER ONLY --><label for=\"\">Nearest Port</label><input type=\"text\" placeholder=\"City\" value=\"\"> <input type=\"text\" placeholder=\"Select Country\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"\"><!-- change to dropdown --></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">DBA Name</label><input type=\"text\" placeholder=\"Alternate Company Name\" value=\"\"></div><div class=\"form-group\"><label for=\"\">Language*</label><input type=\"text\" placeholder=\"Select Language\" value=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Accepted Currencies*</label><div class=\"col-md-6\"><input type=\"checkbox\"><span>USD</span> <input type=\"checkbox\"><span>JPY</span> <input type=\"checkbox\"><span>AUD</span> <input type=\"checkbox\"><span>CAD</span> <input type=\"checkbox\"><span>CNY</span> <input type=\"checkbox\"><span>SEK</span> <input type=\"checkbox\"><span>HKD</span></div><div class=\"col-md-6\"><input type=\"checkbox\"><span>EUR</span> <input type=\"checkbox\"><span>GBP</span> <input type=\"checkbox\"><span>CHF</span> <input type=\"checkbox\"><span>MXN</span> <input type=\"checkbox\"><span>NZD</span> <input type=\"checkbox\"><span>RUB</span> <input type=\"checkbox\"><span>SGD</span></div></div><div class=\"form-group\"><label for=\"\">Accepted Payment Terms*</label><div class=\"col-md-6\"><input type=\"checkbox\"><span>MoneyGram</span> <input type=\"checkbox\"><span>T/T</span> <input type=\"checkbox\"><span>Escrow</span> <input type=\"checkbox\"><span>D/P D/A</span></div><div class=\"col-md-6\"><input type=\"checkbox\"><span>Western Union</span> <input type=\"checkbox\"><span>Credit Card</span> <input type=\"checkbox\"><span>PayPal</span> <input type=\"checkbox\"><span>Cash</span></div></div><div class=\"form-group\"><label for=\"\">Accepted Delivery Terms</label><div class=\"col-md-6\"><input type=\"checkbox\"><span>EXW</span> <input type=\"checkbox\"><span>CPT</span> <input type=\"checkbox\"><span>DAT</span> <input type=\"checkbox\"><span>DDP</span> <input type=\"checkbox\"><span>FOB</span> <input type=\"checkbox\"><span>CIF</span></div><div class=\"col-md-6\"><input type=\"checkbox\"><span>FCA</span> <input type=\"checkbox\"><span>CIP</span> <input type=\"checkbox\"><span>DAP</span> <input type=\"checkbox\"><span>FAS</span> <input type=\"checkbox\"><span>CFR</span> <input type=\"checkbox\"><span>Custom</span></div></div></div><div class=\"col-md-12\"><div class=\"form-group\"><label for=\"\">Enter Product Categories of Interest</label><input type=\"text\" placeholder=\"Begin typing to search categories...\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Begin typing to search categories...\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Begin typing to search categories...\" value=\"\"><!-- change to dropdown --></div></div></div></form></div>"
  );


  $templateCache.put('descriptions.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Descriptions</h4></div><div class=\"row form-body\"></div></form></div>"
  );


  $templateCache.put('edit_company_profile.html',
    "<div><div class=\"row main-row\"><div class=\"col-sm-4 nav-panel\"><ul><li pc-nav=\"company_details\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"edit_company_profile.company_details\">Company Details</a></li><li pc-nav=\"company_information\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"edit_company_profile.company_information\">[activeMode] Information</a></li><li pc-nav=\"production_details\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"edit_company_profile.production_details\">Production Details</a></li><li pc-nav=\"descriptions\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"edit_company_profile.descriptions\">Descriptions</a></li><li pc-nav=\"preferences\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"edit_company_profile.preferences\">Preferences</a></li><li pc-nav=\"social_media\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"edit_company_profile.social_media\">Social Media</a></li><li pc-nav=\"photos\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"edit_company_profile.photos\">Photos</a></li></ul></div><div ui-view=\"\"></div></div></div>"
  );


  $templateCache.put('photos.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Photos</h4></div><div class=\"row form-body\"></div></form></div>"
  );


  $templateCache.put('preferences.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Preferences</h4></div><div class=\"row form-body\"></div></form></div>"
  );


  $templateCache.put('production_details.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Production Details</h4></div><div class=\"row form-body\"></div></form></div>"
  );


  $templateCache.put('social_media.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Social Media</h4></div><div class=\"row form-body\"></div></form></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"dfd\"><a ui-sref=\"fdf\">View Company Profile</a></li><li pc-nav=\"edit_company_profile\"><a ui-sref=\"edit_company_profile.company_details\">Edit Company Profile</a></li><li pc-nav=\"user_account_settings\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li></ul></div><div class=\"navbar-header\"><span class=\"navbar-brand\">My Procur:</span></div></div></nav>"
  );


  $templateCache.put('user_header.html',
    "<div class=\"user-header clearfix\"><ul class=\"user-header-left\"><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><img src=\"/assets/images/procur.png\" class=\"procur-logo\"></a></li><li class=\"user-header-item\"><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Early Access</a></li><li class=\"user-header-item\"><p class=\"text-lowercase\">{{user.firstName}} {{user.lastName}}</p><p>·</p><p>{{company.name}}</p></li></ul><ul class=\"user-header-right\"><li class=\"user-header-item\" ng-if=\"company.buyer && company.supplier\"><button class=\"btn btn-link buyer-supplier-switch\" ng-click=\"user.toggleActiveMode()\">Currently in {{user.activeMode}} mode <i class=\"glyphicon glyphicon-transfer\"></i> Switch to {{user.inactiveMode}}</button></li><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li></ul></div>"
  );


  $templateCache.put('user_account_settings.html',
    "<div id=\"user_account_settings\"><div class=\"row main-row\"><div class=\"col-sm-4 nav-panel\"><ul><li pc-nav=\"update_settings\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"user_account_settings.update_settings\">Update Settings</a></li><li pc-nav=\"update_password\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"user_account_settings.update_password\">Change Password</a></li></ul></div><div ui-view=\"\"></div></div></div>"
  );


  $templateCache.put('user_update_password.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Update Password</h4></div><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label>Enter New Password</label><input type=\"text\" placeholder=\"First\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label>Confirm New Password</label><input type=\"text\" placeholder=\"Job Title\"></div></div></div><div class=\"row\"><button class=\"continue-button\" type=\"submit\">Save&nbsp;&nbsp; <span class=\"glyphicon glyphicon-ok\"></span></button></div></form></div>"
  );


  $templateCache.put('user_update_settings.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Contact Information</h4></div><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"name\">Contact Name*</label><input type=\"text\" id=\"firstName\" placeholder=\"First\" value=\"{{user.firstName}}\"> <input type=\"text\" id=\"lastName\" placeholder=\"Last\" value=\"{{user.lastName}}\"></div><div class=\"form-group\"><label>Current Email Address</label><input type=\"text\" placeholder=\"Current Email\" value=\"{{user.email}}\"></div><div class=\"form-group\"><label>Update Email Address</label><input type=\"text\" placeholder=\"Enter New Address\"> <input type=\"text\" placeholder=\"Confirm New Address\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label>Job Title</label><input type=\"text\" placeholder=\"Job Title\" value=\"{{user.jobTitle}}\"></div><div class=\"form-group\"><label>Update Profile Picture</label><input type=\"file\"></div></div></div><div class=\"row submit-button-row\"><button class=\"continue-button\" type=\"submit\">Save&nbsp;&nbsp; <span class=\"glyphicon glyphicon-ok\"></span></button></div></form></div>"
  );

}]);


// assets/javascripts/app/main_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.States',
    'pc.Templates',
    'pc.Nav',
    'pc.Dashboard',
    'pc.UserAccountSettings',
    'pc.EditCompanyProfile'
  ];

  angular.module('pc.Main', dependencies);

})(angular);