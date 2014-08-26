angular.module('pc.Registration.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('wizard_header.html',
    "<div class=\"container\"><nav class=\"navbar registration\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <img src=\"/images/procur.png\" class=\"procur-logo\"></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li><span class=\"early-access\">Early Access</span></li><li><h6>Account Registration</h6></li></ul></div></div></nav></div>"
  );


  $templateCache.put('company_handle.html',
    "<div class=\"panel-content\"><div class=\"panel-heading\"><h5 class=\"text-center\">Set your custom link</h5></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-xs-12\"><form class=\"form\" novalidate><div class=\"row\"><div class=\"col-xs-12\"><div class=\"form-group\"><div class=\"input-group\"><label class=\"sr-only\" for=\"custom-link\">Custom Link</label><div class=\"input-group-addon\">https://app.procur.com/companies/</div><input type=\"text\" id=\"custom-link\" placeholder=\"YourCustomLinkHere\" ng-model=\"handle\" required></div></div></div></div></form></div></div></div></div><button class=\"btn btn-continue\" type=\"button\" ng-click=\"setHandle()\">Continue <span class=\"fa fa-arrow-right\"></span></button>"
  );


  $templateCache.put('company_information.html',
    "<div class=\"panel-content\"><div class=\"panel-heading\"><h5 class=\"text-center\">Please fill out your company information</h5></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-xs-12\"><form class=\"form\" name=\"companyInformationForm\" novalidate><div class=\"row\"><div class=\"col-sm-6\"><div class=\"form-group\"><label for=\"company-name\">Company Name*</label><input type=\"text\" id=\"company-name\" placeholder=\"Acme Co.\" ng-model=\"companyInformation.name\" required></div><div class=\"form-group\"><label for=\"company-email\">General Company Email*</label><input type=\"email\" id=\"company-email\" placeholder=\"info@company.com\" ng-model=\"companyInformation.email\" required></div><div class=\"form-group\"><label for=\"company-phone\">Company Phone*</label><div class=\"row\"><div class=\"col-xs-4\"><input type=\"text\" placeholder=\"+\" ng-model=\"companyInformation.phoneNumberCountryCode\"></div><div class=\"col-xs-8\"><input type=\"text\" id=\"company-phone\" placeholder=\"555-123-4567\" ng-model=\"companyInformation.phoneNumber\" required></div></div></div></div><div class=\"col-sm-6\"><div class=\"form-group\"><label for=\"company-type\">Type of Company*</label><select id=\"company-type\" ng-model=\"companyInformation.type\" required><option value=\"\">Select...</option><option value=\"foo\">TEMP VALUE</option></select></div><div class=\"form-group\"><label for=\"company-location\">Company Location*</label><select id=\"company-location\" ng-model=\"companyInformation.location\" required><option value=\"\">Select...</option><option value=\"foo\">TEMP VALUE</option></select></div><div class=\"form-group\"><label for=\"primary-language\">Primary Language*</label><select id=\"primary-language\" ng-model=\"companyInformation.primaryLanguage\" required><option value=\"\">Select...</option><option value=\"foo\">TEMP VALUE</option></select></div></div></div><div class=\"row\"><div class=\"col-sm-12\"><div class=\"form-group\"><label for=\"terms\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"terms\" ng-model=\"agreeTerms\"> I have read and agree to the Terms of Service and Privacy Policy</label><label for=\"authorized-user\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"authorized-user\" ng-model=\"agreeAuthorized\"> I assert that I am authorized by the company I entered above to use Procur.com on their behalf in accordance with the Terms of Service and Privacy Policy.</label></div></div></div><div class=\"row separator\"><div class=\"col-sm-12\"><h5 class=\"text-center\">Optional Information</h5></div></div><div class=\"row\"><div class=\"col-sm-6\"><div class=\"form-group\"><label for=\"company-website\">Company Website</label><input type=\"url\" id=\"company-website\" placeholder=\"http://www.company.com\" ng-model=\"companyInformation.website\"></div><div class=\"form-group\"><label for=\"company-logo\">Company Logo</label><div class=\"row\"><div class=\"col-sm-4\"><button class=\"btn btn-default btn-sm\" pc-image-select>Choose Image</button></div><div class=\"col-sm-8\" ng-switch=\"!!companyInformation.logo.url\"><div class=\"form-group profile-image\" ng-switch-when=\"true\"><img ng-src=\"{{companyInformation.logo.url}}\"></div><p class=\"no-file\" ng-switch-when=\"false\">No file chosen</p></div></div></div></div><div class=\"col-sm-6\"><div class=\"form-group\"><label for=\"company-dba\">DBA Name</label><input type=\"text\" id=\"company-dba\" placeholder=\"Alternate Business Name\" ng-model=\"companyInformation.dba\"></div><div class=\"form-group\"><label for=\"industry\">Industry</label><select id=\"industry\" ng-model=\"companyInformation.industry\"><option value=\"\">Select...</option><option value=\"foo\">TEMP VALUE</option></select></div><div class=\"form-group\" ng-if=\"isSupplier\"><label for=\"annual-sales\">Annual Sales</label><select id=\"annual-sales\" ng-model=\"companyInformation.annualSales\"><option value=\"\">Select...</option><option value=\"foo\">TEMP VALUE</option></select></div></div></div><div class=\"row\"><div class=\"col-sm-12\"><div class=\"form-group\"><label for=\"product-specialties\">Enter Product Specialties</label><input type=\"text\" id=\"product-specialties\" placeholder=\"Begin typing to search categories...\" ng-model=\"companyInformation.productSpecialties[0]\"> <input type=\"text\" placeholder=\"Begin typing to search categories...\" ng-model=\"companyInformation.productSpecialties[1]\"> <input type=\"text\" placeholder=\"Begin typing to search categories...\" ng-model=\"companyInformation.productSpecialties[2]\"></div></div></div></form></div></div></div></div><button class=\"btn btn-continue\" ng-click=\"submitCompanyInformation()\">Continue <span class=\"fa fa-arrow-right\"></span></button>"
  );


  $templateCache.put('email_verification.html',
    "<div class=\"panel-content\"><div class=\"panel-heading\"><h5 class=\"text-center\">Please verify your email address</h5></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-xs-12\"><p class=\"text-center\">Please check your email - you should have a confirmation message from Procur. If you haven't received anything, click 'Resend Email' below.</p></div></div><div class=\"row\"><div class=\"col-sm-6\"><button class=\"btn btn-lg btn-block btn-rounded btn-default\" ng-click=\"resendEmailVerification()\">Resend Email</button></div><div class=\"col-sm-6\"><a class=\"btn btn-lg btn-block btn-rounded btn-default\" ng-click=\"alreadyVerified()\">I've already verified</a></div></div></div></div>"
  );


  $templateCache.put('finished_product.html',
    "<div class=\"panel-content\"><div class=\"panel-heading\"><h5 class=\"text-center\">Are you a consumer product company?</h5></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-xs-12\"><p class=\"text-center\">If you aren't sure if you are a consumer production supplier, read <a href=\"https://procur.com/faq\">What are some examples of consumer product companies</a> on our FAQ.</p></div></div><div class=\"row\"><div class=\"col-sm-6\"><a class=\"btn btn-lg btn-block btn-rounded btn-default\" ui-sref=\"wizard.company_information\">Yes</a></div><div class=\"col-sm-6\"><a class=\"btn btn-lg btn-block btn-rounded btn-default\" ui-sref=\"wizard.finished_product_confirmation\">No</a></div></div></div></div>"
  );


  $templateCache.put('finished_product_confirmation.html',
    "<div class=\"panel-content\"><div class=\"panel-heading\"><h5 class=\"text-center\">You are not a consumer product company?</h5></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-xs-12\"><p class=\"text-center\">Procur helps consumer product companies sell products that are \"read for retail\".</p><p class=\"text-center\">If you aren't sure if you are a consumer production supplier, read <a href=\"https://procur.com/faq\">What are some examples of consumer product companies</a> on our FAQ.</p></div></div><div class=\"row\"><div class=\"col-sm-6\"><a class=\"btn btn-lg btn-block btn-rounded btn-default\" ui-sref=\"wizard.company_information\">Wait - I am!</a></div><div class=\"col-sm-6\"><!-- TODO: Need to delete the session info when this link is clicked --><!-- TODO: Need to update user setting the notBgf property to true --><a class=\"btn btn-lg btn-block btn-rounded btn-default\" href=\"https://procur.com\">No, I'm not</a></div></div></div></div>"
  );


  $templateCache.put('type.html',
    "<div class=\"panel-content\"><div class=\"panel-heading\"><h5 class=\"text-center\">Select your company type</h5></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-sm-6\"><button class=\"btn btn-lg btn-block btn-rounded btn-default\" ng-click=\"selectType('buyer')\">Buyer</button></div><div class=\"col-sm-6\"><button class=\"btn btn-lg btn-block btn-rounded btn-default\" ng-click=\"selectType('supplier')\">Supplier</button></div></div></div></div>"
  );


  $templateCache.put('wizard.html',
    "<div class=\"registration-wizard\"><div class=\"row\"><div class=\"col-xs-12\"><p class=\"lead text-center\">{{wizard.leadText}}</p></div></div><div class=\"row progress-tracker hidden-xs\"><div class=\"col-xs-10 col-xs-offset-1\"><ul class=\"list-inline\"><li ng-repeat=\"progress in wizard.progressBar track by $index\"><div ng-if=\"!$first\" class=\"progress-line progress-line-left\"></div><span class=\"progress-indicator fa\" ng-class=\"{'fa-circle': progress.status === 0, 'fa-circle-o': progress.status === -1, 'fa-check-circle': progress.status === 1}\"></span><p class=\"text-center\" ng-class=\"{active: progress.status === 0}\">{{progress.label}}</p><div ng-if=\"!$last\" class=\"progress-line progress-line-right\"></div></li></ul></div></div><br><br><div class=\"row\"><div class=\"col-xs-12 col-sm-10 col-sm-offset-1\"><div ui-view></div></div></div></div>"
  );


  $templateCache.put('snackbar.html',
    "<div class=\"snackbar\" role=\"alert\" ng-style=\"styles.wrapper\" ng-class=\"position\"><p class=\"snackbar-message\" ng-style=\"styles.message\">{{message}}</p></div>"
  );

}]);
