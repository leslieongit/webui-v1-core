app.controller("NavbarCtrl",["$location","$route","$scope","$rootScope","Restangular","UserService","API_URL","RequestCacheService","PortalSettingsService","$translatePartialLoader","$translate","$timeout",function($location,$route,$scope,$rootScope,Restangular,UserService,API_URL,RequestCacheService,PortalSettingsService,$translatePartialLoader,$translate,$timeout){$scope.user=UserService,$scope.pages=[],$scope.logo_url="",$scope.headerMenu=[],$scope.logoUrl="",$scope.showLogoPlaceholder=!1,$scope.$location=$location,PortalSettingsService.getSettingsObj().then(function(success){$scope.public_setting=success.public_setting;var logo_url=success.public_setting.site_logo.path_external;$scope.payment_gateway=success.public_setting.site_payment_gateway,$scope.logoUrl=logo_url?API_URL.url+"/image/site_logo_320x80/"+logo_url:"images/logo.jpg","undefined"==typeof success.public_setting.site_logo_link?$scope.site_logo_link="/":$scope.site_logo_link=success.public_setting.site_logo_link,$scope.headerMenu=success.public_setting.site_menu_header,$scope.hideStartCampaignPage=success.public_setting.site_campaign_creation_hide_start_page,$scope.mode_allowed=success.public_setting.site_campaign_raise_modes.allowed,$rootScope.checkstart=$scope.mode_allowed,$scope.hideStartCampaignPage&&"undefined"!=typeof $scope.hideStartCampaignPage&&($scope.campaign={},$scope.campaign.profile_type_id=1,$scope.campaign.raise_mode_id=success.public_setting.site_campaign_raise_modes["default"]),RequestCacheService.getPage().then(function(success){for(var i=0;i<$scope.headerMenu.length;i++)for(var j=0;j<success.length;j++)$scope.headerMenu[i].id==success[j].id&&("/"==success[j].path?($scope.headerMenu[i].name=success[j].name,$scope.headerMenu[i].path="/"):$scope.headerMenu[i].id&&($scope.headerMenu[i].name=success[j].name,$scope.headerMenu[i].path=success[j].path),$scope.hideStartCampaignPage&&"undefined"!=typeof $scope.hideStartCampaignPage&&"Start"==$scope.headerMenu[i].name&&($scope.headerMenu[i].path="getstarted"));if($scope.public_setting.site_admin_campaign_management_only)for(var i=0;i<$scope.headerMenu.length;i++)if("Start"==$scope.headerMenu[i].name&&1!=UserService.person_type_id){$scope.headerMenu.splice(i,1);break}if($scope.hideCampaignNav=$scope.public_setting.site_admin_campaign_management_only&&1!=$scope.user.person_type_id,$scope.hideStartCampaignPage&&"undefined"!=typeof $scope.hideStartCampaignPage)for(var navElements=document.querySelectorAll(".menu .item"),n=0;n<navElements.length;n++)"Start"==navElements[n].text&&(navElements[n].onclick=function(e){e.preventDefault();for(var i=0;i<$scope.headerMenu.length;i++)"Start"==$scope.headerMenu[i].name&&($scope.campaign.name="unnamed_campaign",$scope.user.isLoggedIn()?Restangular.one("campaign").customPOST($scope.campaign).then(function(response){var id=response.entry_id,data={campaign_manager:1};UserService.updateUserData(data),$location.path("/getstarted/"+id)},function(error){$scope.errorMsg=error.data.message}):$timeout(function(){$location.path("/login")}))});$scope.navItem=function(){$route.reload()}}),$scope.stickyMenu=success.public_setting.site_theme_sticky_menu,$scope.enabledContribution=success.public_setting.site_campaign_contributions}),$scope.reload=function(){$route.reload()},$scope.closeMobileSidebar=function(){$("#mobile-sidebar").sidebar("hide"),$("body").removeClass("mobile-sidebar-no-scroll")},$scope.showMobileSidebar=function(){$("#mobile-sidebar").sidebar("is visible")?$("#mobile-sidebar").sidebar("hide"):($("#mobile-sidebar").sidebar("show"),$("body").addClass("mobile-sidebar-no-scroll"))}}]);