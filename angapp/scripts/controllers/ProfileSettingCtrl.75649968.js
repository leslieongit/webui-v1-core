app.controller("ProfileSettingCtrl",["$location","$timeout","$scope","$q","$rootScope","UserService","$translatePartialLoader","$translate","Restangular","Geolocator","PHONE_TYPE","PortalSettingsService",function($location,$timeout,$scope,$q,$rootScope,UserService,$translatePartialLoader,$translate,Restangular,Geolocator,PHONE_TYPE,PortalSettingsService){function selectQueue(tableClass){var queue=[];return $("table."+tableClass).find("tbody td.t-check-box input").each(function(){if($(this).prop("checked")){var item=$(this).scope();queue.push(item)}}),queue}$scope.formPreventDefault=function(event){if(13==event.keyCode)return event.preventDefault(),!1},$scope.organization_name={},$scope.clearMessage=function(){$rootScope.floatingMessage=[]};var msg;PortalSettingsService.getSettingsObj().then(function(success){$scope.public_settings=success.public_setting,$scope.isAccSetEnabled=success.public_setting.site_disable_account_setting,$scope.native_lookup=success.public_setting.site_theme_shipping_native_lookup,$scope.isRemoveUserProfileBio=success.public_setting.site_remove_user_profile_bio,$scope.getCustomFields()}),$scope.getCustomFields=function(){$scope.custom_field=[],Restangular.one('portal/person/attribute?filters={"person_id":"'+UserService.person_id+'"}').customGET().then(function(success){$scope.$emit("loading_finished"),success&&($scope.custom_field=success),$scope.public_settings.site_campaign_enable_organization_name&&$scope.custom_field[0].attributes&&($scope.organization_name.value=$scope.custom_field[0].attributes.organization_name,$scope.organization_name.ein=$scope.custom_field[0].attributes.ein),$scope.public_settings.site_campaign_business_section_custom&&$scope.public_settings.site_campaign_business_section_custom.length>0&&($scope.bcustom=[],angular.forEach($scope.public_settings.site_campaign_business_section_custom,function(value){var fieldRequire=!1,fieldPlaceholder="";value.placeholder&&(fieldPlaceholder=value.placeholder),value.profile_setting_required&&(fieldRequire=value.profile_setting_required);var field={name:value.name,identifier:"customFieldBusiness"+key,value:"",placeholder:fieldPlaceholder,required:fieldRequire};angular.forEach($scope.custom_field[0].attributes,function(val,key,obj){key&&key==value.name&&(field.value=val)}),$scope.bcustom.push(field)}),$scope.bcustom_copy=angular.copy($scope.bcustom)),$scope.public_settings.site_campaign_personal_section_custom&&$scope.public_settings.site_campaign_personal_section_custom.length>0&&($scope.pcustom=[],angular.forEach($scope.public_settings.site_campaign_personal_section_custom,function(value,key){var fieldRequire=!1,fieldPlaceholder="";if(value.placeholder&&(fieldPlaceholder=value.placeholder),value.profile_setting_required&&(fieldRequire=value.profile_setting_required),$scope.public_settings.site_campaign_personal_section_enhanced)var field={name:value.name,identifier:"customField"+key,value:"",option:value.option,dropdown_array:value.dropdown_array,profile_step_show:value.profile_step_show,profile_setting_register_show:value.profile_setting_register_show,profile_setting_show:value.profile_setting_show,register_show:value.register_show,validate:value.validate,placeholder:fieldPlaceholder,required:fieldRequire};else var field={name:value.name,identifier:"customField"+key,value:"",option:"Text",dropdown_array:null,profile_step_show:!0,placeholder:fieldPlaceholder,required:fieldRequire};angular.forEach($scope.custom_field[0].attributes,function(val,key,obj){key&&key==value.name&&(field.value=val)}),$scope.pcustom.push(field)}),$scope.pcustom_copy=angular.copy($scope.pcustom))},function(error){$scope.custom_field=[],$scope.pcustom=[],$scope.pcustom_copy=angular.copy($scope.pcustom),$scope.$emit("loading_finished")})},$scope.customFieldDropdown=function(option,field){field.value=option},$scope.savePersonAttributes=function(person_id,$data){Restangular.one("portal/person/attribute",person_id).customPUT($data)},$scope.emailshow=!1;var hashVal=$location.hash();hashVal&&($("#profile-setting-tabs").find("[data-tab]").removeClass("active"),$("#profile-setting-tabs").find("[data-tab="+hashVal+"]").addClass("active")),$scope.clickHash=function(tabName){$location.hash(tabName).replace()},$scope.user=UserService,$scope.openModal=function(modalId,callback){var selector=$(".modal#"+modalId);selector.modal({closable:!1,onApprove:function(){return"function"==typeof callback&&callback(),!1}}).modal("show")},$scope.closeModal=function(){$(".ui.modal").modal("hide")},$scope.dimmerOn=function(){$(".image").dimmer("show")},$scope.dimmerOff=function(){$(".image").dimmer("hide")},$scope.checkAll=function(tableClass){var checked=$("."+tableClass+" thead tr .check-all input").prop("checked");0==checked?$("."+tableClass+" tbody tr .t-check-box input").prop("checked",!0):$("."+tableClass+" tbody tr .t-check-box input").prop("checked",!1)},$("#profile-setting-tabs .menu-tabs .item").tab({context:$("#profile-setting-tabs")}),$scope.getCompany=function(){Restangular.one("account/business").customGET().then(function(success){$scope.companies=success})},$scope.multiDelete=function(tableClass,modalID,callback){$scope.deleteQueue=selectQueue(tableClass),$scope.itemDeleteCount=$scope.deleteQueue.length,$scope.deleteQueue.length?$scope.openModal(modalID,callback):(msg={header:"profile_setting_select_error"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage())}}]),app.controller("TabPersonCtrl",["$translate","$scope","$timeout","$q","Restangular","UserService","FileUploadService","$rootScope",function($translate,$scope,$timeout,$q,Restangular,UserService,FileUploadService,$rootScope){function getProfileInfo(){Restangular.one("account/person",UserService.person_id).customGET().then(function(success){$scope.profile={first_name:success.first_name,last_name:success.last_name,bio:success.bio},$rootScope.checkperson=$scope.profile})}function getProfileImage(){Restangular.one("account/resource/file").customGET().then(function(success){$scope.profileImage=success.personal})}function getProfileLinks(){Restangular.one("account/website").customGET().then(function(success){$scope.profileLinks=success.personal;for(var n in $scope.profileLinks){var current_profile_link=$scope.profileLinks[n].uri;for(var i in $scope.profile_protocols){var indexOf=current_profile_link.indexOf($scope.profile_protocols[i].value);if(indexOf>-1){$scope.profileLinks[n].uri=current_profile_link.replace($scope.profile_protocols[i].value,""),$scope.profileLinks[n].profile_link_default_protocol=$scope.profile_protocols[i].value;break}$scope.profileLinks[n].profile_link_default_protocol=$scope.profile_protocols[2].value}}})}function saveAccountInfo(data){return Restangular.one("account").customPUT(data)}function saveProfileLinks(){var requestQueue=[],selectedProtocols=$(".dropdown.profile-link-protocol").dropdown("get text");return angular.forEach($scope.profileLinks,function(link,key){var new_link={};for(var prop in link)new_link[prop]=link[prop];Array.isArray(selectedProtocols)?"relative"==selectedProtocols[key]?new_link.uri=link.uri:(link.uri=link.uri.replace(/^https?\:\/\//i,""),new_link.uri=selectedProtocols[key]+link.uri):"relative"==selectedProtocols?new_link.uri=link.uri:(link.uri=link.uri.replace(/^https?\:\/\//i,""),new_link.uri=selectedProtocols+link.uri),new_link.uri_id?requestQueue.push(Restangular.one("account/website",new_link.uri_id).customPUT(new_link)):requestQueue.push(Restangular.one("account/website").customPOST(new_link))}),requestQueue}getProfileInfo(),$scope.organization_name={},getProfileImage(),$scope.profile_protocols=[{value:"http://"},{value:"https://"},{value:"Relative Path"}],$scope.profile_link_default_protocol=$scope.profile_protocols[0],getProfileLinks(),$scope.addLink=function(arr){var link={uri:"",uri_text:""};angular.isUndefined(arr)?angular.copy(link):arr.push(angular.copy(link))},$scope.removeProfileLink=function(link,index){link.uri_id&&Restangular.one("account/website",link.uri_id).customDELETE().then(function(success){msg={header:"link_removed"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()}),$scope.profileLinks.splice(index,1)},$.fn.form.settings.rules.regexCustomValidation=function(value,validate){var regex=new RegExp(validate);return!value||!!regex&&regex.test(value)};var personalValidation=function(){var translation=$translate.instant(["tab_personal_setting_fname_validation","tab_personal_setting_lname_validation","tab_personal_setting_custom_field_validate","tab_personal_setting_custom_field_empty"]);$scope.form_validation={first_name:{identifier:"first_name",rules:[{type:"empty",prompt:translation.tab_personal_setting_fname_validation}]},last_name:{identifier:"last_name",rules:[{type:"empty",prompt:translation.tab_personal_setting_lname_validation}]}},angular.forEach($scope.pcustom,function(value,key){if(value.required&&!value.validate){var customValidate={identifier:value.identifier,rules:[{type:"empty",prompt:translation.tab_personal_setting_custom_field_empty}]};$scope.form_validation["customField"+key]=customValidate}else if(!value.required&&value.validate){var customValidate={identifier:value.identifier,rules:[{type:"regexCustomValidation["+value.validate+"]",prompt:translation.tab_personal_setting_custom_field_validate}]};$scope.form_validation["customField"+key]=customValidate}else if(value.required&&value.validate){var customValidate={identifier:value.identifier,rules:[{type:"empty",prompt:translation.tab_personal_setting_custom_field_empty},{type:"regexCustomValidation["+value.validate+"]",prompt:translation.tab_personal_setting_custom_field_validate}]};$scope.form_validation["customField"+key]=customValidate}}),$(".ui.form").form($scope.form_validation,{inline:!0,keyboardShortcuts:!0,onSuccess:function(){$scope.valcheck=$scope.valcheck&&!0},onFailure:function(){$scope.valcheck=$scope.valcheck&&!1,$("html, body").animate({scrollTop:$(".field.error").offset().top},1e3)}}).form("validate form")};for($scope.saveData=function(e){$scope.valcheck=!0,personalValidation();var custom_fields={};$scope.pcustom&&angular.forEach($scope.pcustom,function(v){custom_fields[v.name]=v.value}),$scope.public_settings.site_campaign_enable_organization_name&&(custom_fields.organization_name=$scope.organization_name.value,custom_fields.ein=$scope.organization_name.ein),custom_fields&&(custom_fields=JSON.stringify(custom_fields));var customFieldData={attributes:custom_fields},accountData={first_name:$scope.profile.first_name,last_name:$scope.profile.last_name,bio:$scope.profile.bio};$scope.valcheck&&saveAccountInfo(accountData).then(function(success){UserService.updateUserData(accountData),msg={loading:!0,loading_message:"in_progress"},$scope.savePersonAttributes(UserService.person_id,customFieldData),$rootScope.floatingMessage=msg,$q.all(saveProfileLinks()).then(function(success){msg={header:"success_message_save_changes_button"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()},function(failed){msg={header:failed.data.message},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()})},function(failed){msg={header:failed.data.message},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()})},$scope.profileLinks=[]||$scope.profileLinks;0===$scope.profileLinks.length;)$scope.addLink($scope.profileLinks);$scope.uploadProfileImage=function(files){if(files.length)if($scope.allowedImage(files[0].type)){var params={resource_content_type:"image"},$picNode=$(".profilePersonal");Restangular.one("account/resource/file/").customGET().then(function(success){0==success.personal.length?FileUploadService.upload("account/resource/file",files,params,$picNode).then(function(success){0!=success.length&&$scope.profileImage.push(success[0].data)}):FileUploadService.modify("account/resource/file/",files,params,success.personal[0].id,$picNode).then(function(success){0!=success.length&&($scope.profileImage=[],$scope.profileImage.push(success[0].data))})})}else $(".wrong-filetype").modal("show")},$scope.allowedImage=function(file_type){var allowed_type=["image/vnd.microsoft.icon","image/x-icon","image/png","image/pjpeg","image/jpeg","image/gif"];return allowed_type.indexOf(file_type)>-1},$scope.deleteProfileImage=function(files){if(files&&files.length){var file=files.pop();Restangular.one("account/resource/file").customDELETE(file.id),$(".imagePlace .dimmer").dimmer("hide"),$(".ui.progress.upload-bar").show(),$(".ui.loader.download-loader").hide()}},Restangular.one('portal/person/attribute?filters={"person_id":"'+UserService.person_id+'"}').customGET().then(function(success){success[0].attributes&&($scope.organization_name.value=success[0].attributes.organization_name,$scope.organization_name.ein=success[0].attributes.ein)})}]),app.controller("TabCompanyCtrl",["$translate","$scope","$timeout","$q","Restangular","UserService","FileUploadService","$rootScope",function($translate,$scope,$timeout,$q,Restangular,UserService,FileUploadService,$rootScope){function saveBusinessLinks(){var selectedProtocols=$(".dropdown.business-link-setup").dropdown("get text");angular.forEach($scope.businessLinks,function(link,key){var new_link={};for(var prop in link)new_link[prop]=link[prop];Array.isArray(selectedProtocols)?"Relative Path"==selectedProtocols[key]?new_link.uri=link.uri:new_link.uri=selectedProtocols[key]+link.uri:"Relative Path"==selectedProtocols?new_link.uri=link.uri:new_link.uri=selectedProtocols+link.uri,new_link.uri_text&&new_link.uri&&(new_link.uri_id?Restangular.one("account/website",new_link.uri_id).customPUT(new_link):(new_link.business_organization_id=$scope.businessSelected.business_organization_id,Restangular.one("account/website").customPOST(new_link)))})}function getBusinessLinks(businessId){Restangular.all("account/website?business_organization_id="+businessId).customGET().then(function(success){$scope.businessLinks=success.business;for(var n in $scope.businessLinks){var current_business_link=$scope.businessLinks[n].uri;for(var i in $scope.profile_protocols){var indexOf=current_business_link.indexOf($scope.profile_protocols[i].value);if(indexOf>-1){$scope.businessLinks[n].uri=current_business_link.replace($scope.profile_protocols[i].value,""),$scope.businessLinks[n].profile_link_default_protocol=$scope.profile_protocols[i].value;break}$scope.businessLinks[n].profile_link_default_protocol=$scope.profile_protocols[2].value}}})}function getBusinessInfo(){Restangular.one("account/business").customGET().then(function(success){$scope.businesses=success,$scope.businesses[0]?$scope.showcompany=!0:$scope.showcompany=!1})}$scope.deleteProfileImage=function(files){var index=0;Restangular.one("account/resource/file").customDELETE(files[index].id).then(function(){files.splice(index,1)}),$(".imagePlace .dimmer").dimmer("hide"),$(".ui.loader.download-loader").fadeOut(),$(".ui.progress.upload-bar").fadeOut()},$scope.profile_protocols=[{value:"http://"},{value:"https://"},{value:"Relative Path"}],$scope.profile_link_default_protocol=$scope.profile_protocols[0],getBusinessInfo(),$scope.getBusinessImage=function(businessID){Restangular.one("account/resource/file?business_organization_id="+businessID).customGET().then(function(success){$scope.businessImage=success})},$scope.uploadBusinessImage=function(files){if(files.length){var $picNode=$(".profileCompany"),params={resource_content_type:"image",business_organization_id:$scope.businessSelected.id};$scope.businessSelected.id?FileUploadService.upload("account/resource/file/",files,params,$picNode).then(function(success){$scope.businessImage=[],$scope.businessImage.push(success[0].data)}):($scope.businessSelected.name||($scope.businessSelected.name="Placeholder"),Restangular.one("account/business").customPOST($scope.businessSelected).then(function(success){$scope.businessSelected=success,getBusinessInfo(),params.business_organization_id=$scope.businessSelected.id,FileUploadService.upload("account/resource/file/",files,params,$picNode).then(function(success){$scope.businessImage=[],$scope.businessImage.push(success[0].data)})}))}},$scope.deleteBusinessImage=function(files){if(files&&files.length){var file=files.pop(),param={business_organization_id:$scope.businessSelected.id};Restangular.one("account/resource/file").customDELETE(file.id,param),$(".imagePlace .dimmer").dimmer("hide"),$(".ui.loader.download-loader").fadeOut(),$(".ui.progress.upload-bar").fadeOut()}},$scope.selectBusiness=function(business){$scope.businessLinks=[],$scope.businessImage=null,$scope.getBusinessImage(business.business_organization_id),$scope.businessSelected=business,getBusinessLinks(business.business_organization_id)},$scope.newBusiness=function(){$(".ui.form.company-form").form("clear"),$scope.businessSelected={business_organization_id:"",description:"",name:""},$scope.businessLinks=[],$scope.businessImage=[]},$scope.addBusinessLink=function(arr){var link={uri:"",uri_text:"",business_organization_id:$scope.businessSelected.business_organization_id};angular.isUndefined(arr)?angular.copy(link):arr.push(angular.copy(link))},$scope.removeBusinessLink=function(link){link.uri_id?Restangular.one("account/website").customDELETE(link.uri_id,{business_organization_id:link.business_organization_id}).then(function(success){$scope.businessLinks.splice($scope.businessLinks.indexOf(link),1)}):$scope.businessLinks.splice($scope.businessLinks.indexOf(link),1)},$scope.companyValidation=function(){var translation=$translate.instant(["tab_company_setting_company_name_error"]);$(".company-form.ui.form").form({company_name:{identifier:"company_name",rules:[{type:"empty",prompt:translation.tab_company_setting_company_name_error}]}},{inline:!0,onSuccess:function(){$scope.valcheck=$scope.valcheck&&!0},onFailure:function(){$scope.valcheck=$scope.valcheck&&!1}}).form("validate form")},$scope.saveBusinessInfoEnter=function(event){13==event.keyCode&&(event.target.blur(),$scope.saveBusinessInfo(event))},$scope.saveBusinessInfo=function(){if($scope.valcheck=!0,$scope.companyValidation(),$scope.valcheck){var request;msg={loading:!0,loading_message:"in_progress"},$rootScope.floatingMessage=msg;var custom_fields={};$scope.bcustom&&angular.forEach($scope.bcustom,function(v){custom_fields[v.name]=v.value}),custom_fields&&(custom_fields=JSON.stringify(custom_fields));var customFieldData={attributes:custom_fields};$scope.savePersonAttributes(UserService.person_id,customFieldData),request=$scope.businessSelected.business_organization_id?Restangular.one("account/business",$scope.businessSelected.business_organization_id).customPUT($scope.businessSelected).then(function(success){saveBusinessLinks(),msg={header:"success_message_save_changes_button"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),$scope.getCompany()}):Restangular.one("account/business").customPOST($scope.businessSelected).then(function(success){$scope.businessSelected=success,saveBusinessLinks(),msg={header:"success_message_save_changes_button"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),$scope.getCompany()}),request?request.then(function(){$("#setting-add-company").modal("hide"),msg={header:"tab_company_setting_company_info_save_success"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),getBusinessInfo()}):(msg={header:"tab_company_setting_company_info_save_error"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage())}},$scope.removeBusiness=function(business){return Restangular.one("account/business",business.business_organization_id).customDELETE()},$scope.confirmDeleteBusiness=function(){var requestQueue=[];angular.forEach($scope.deleteQueue,function(value){requestQueue.push($scope.removeBusiness(value.business))}),msg={loading:!0,loading_message:"in_progress"},$rootScope.floatingMessage=msg,$q.all(requestQueue).then(function(success){angular.forEach(success,function(value){angular.forEach($scope.businesses,function(business,index){value.id==business.id&&$scope.businesses.splice(index,1)})}),msg={header:"tab_company_setting_company_info_delete_success"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),$scope.getCompany()},function(failed){msg={header:failed.data.message},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()})}}]),app.controller("TabAddressCtrl",["$translate","$scope","$timeout","$q","Restangular","UserService","Geolocator","PortalSettingsService","$rootScope",function($translate,$scope,$timeout,$q,Restangular,UserService,Geolocator,PortalSettingsService,$rootScope){function getCountries(){Geolocator.getCountries().then(function(countries){if($scope.native_lookup)for(var i in countries)null!=countries[i].native_name&&(countries[i].name=countries[i].native_name);if($scope.countries=countries,$scope.default_country){for(var index in $scope.countries){var value=$scope.countries[index];if(value.id==$scope.default_country.id){$scope.default_country=value,$scope.countries.splice(index,1);break}}$scope.countries.splice(0,0,$scope.default_country)}})}function getSubcountries(countryID){Geolocator.getSubcountriesByCountry(countryID).then(function(subcountries){if($scope.native_lookup)for(var i in subcountries)null!=subcountries[i].native_name&&(subcountries[i].name=subcountries[i].native_name);$scope.subcountries=subcountries})}function selectQueue(tableClass){var queue=[];return $("table."+tableClass).find("tbody td.t-check-box input").each(function(){if($(this).prop("checked")){var item=$(this).scope();queue.push(item)}}),queue}function getAddressInfo(){Restangular.one("account/address").customGET().then(function(success){$scope.personal_addresses=checkNative(success.personal),$scope.business_addresses=checkNative(success.business),success.personal?($scope.showadd=!0,$scope.showbadd=!0,$scope.showPersonal("p")):success.business&&($scope.showadd=!1,$scope.showbadd=!0,$scope.showPersonal("b"))})}function checkNative(addressData){return angular.forEach(addressData,function(value,key){if($scope.native_lookup){var name="";name+=null!=value.country_native_name?value.country_native_name:value.country,name+=null!=value.subcountry_native_name?" "+value.subcountry_native_name:" "+value.subcountry,null!=value.city_native_name&&"Other"!=value.city?name+=", "+value.city_native_name:"Other"!=value.city?name+=", "+value.city:value.city="",value.city_full=name}}),addressData}var msg={};$scope.addressSubcountrySelected={},$scope.addressCountrySelected={},$scope.addressSelected={},PortalSettingsService.getSettingsObj().then(function(success){$scope.alt_shipping=success.public_setting.site_theme_alt_shipping_layout,$scope.native_lookup=success.public_setting.site_theme_shipping_native_lookup,$scope.native_lookup&&(success.public_setting.site_theme_default_shipping_country.name=success.public_setting.site_theme_default_shipping_country.native_name),$scope.alt_shipping&&getCountries(),$scope.default_country=success.public_setting.site_theme_default_shipping_country,null!=$scope.default_country&&$scope.default_country.name&&($scope.addressCountrySelected.selected=$scope.default_country),$scope.setCountry($scope.addressCountrySelected.selected),null!=$scope.addressCountrySelected.selected&&Object.getOwnPropertyNames($scope.addressCountrySelected.selected).length&&$scope.addressCountrySelected.selected.name&&getSubcountries($scope.addressCountrySelected.selected.id)});var address_table="";getAddressInfo(),$scope.getCompany(),$scope.selectAddress=function(address){$(".ui.form").form("clear"),$scope.addressSelected=address,$scope.alt_shipping?($scope.addressCountrySelected.selected={name:"",id:0},$scope.addressSubcountrySelected.selected={name:"",id:0},$scope.addressSelected.selected={name:"",id:0},$scope.addressCountrySelected.selected.name=$scope.native_lookup&&address.country_native_name?address.country_native_name:address.country,$scope.addressCountrySelected.selected.id=address.country_id,$scope.addressSubcountrySelected.selected.name=$scope.native_lookup&&address.subcountry_native_name?address.subcountry_native_name:address.subcountry,$scope.addressSubcountrySelected.selected.id=address.subcountry_id,$scope.addressSelected.selected.name=$scope.native_lookup&&address.city_native_name?address.city_native_name:address.city):$scope.addressSelected.selected={name:address.city_full},address.business_organization?$scope.showBusName=!0:$scope.showbusName=!1,angular.forEach($scope.companies,function(value){value.business_organization_id==$scope.addressSelected.business_organization_id&&($scope.companyName=value.name,$("#defaulttext").text($scope.companyName),$("#defaulttext").removeClass("default"))})},$scope.showpersonal=!0,$scope.showbusiness=!1,$scope.newAddress=function(){$(".ui.form").form("clear"),$scope.showBusName=!1,$scope.addressSelected={business_organization_id:"",city_id:"",mail_code:"",street1:"",street2:"",description:""}},$scope.removeAddress=function(address){if($scope.showbusiness){var par={business_organization_id:address.business_organization_id};return Restangular.one("account/address",address.address_id).remove(par)}if($scope.showpersonal)return Restangular.one("account/address",address.address_id).customDELETE()},$scope.confirmDeleteAddress=function(){var requestQueue=($scope.deleteQueue.length,[]);angular.forEach($scope.deleteQueue,function(value,key){requestQueue.push($scope.removeAddress(value.address))}),msg={loading:!0,loading_message:"in_progress"},$rootScope.floatingMessage=msg,$q.all(requestQueue).then(function(success){angular.forEach(success,function(value){angular.forEach($scope.addresses,function(address,index){address.id==value.id&&$scope.addresses.splice(index,1)})}),msg={header:"tab_address_delete_success"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),getAddressInfo()},function(failed){msg={header:failed.data.message},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()})},$scope.searchCities=function(term){var native_lookup=1==$scope.native_lookup?1:0;term&&($scope.alt_shipping?Geolocator.searchCitiesBySubcountry(term,$scope.addressSubcountrySelected.selected.id,native_lookup).then(function(cities){if($scope.cities=cities,!cities||cities instanceof Array&&0===cities.length)Geolocator.searchCitiesBySubcountry(term,$scope.addressSubcountrySelected.selected.id,0).then(function(cities){$scope.cities=cities});else if(native_lookup){for(var i in cities)null!=cities[i].city_native_name&&(cities[i].name=cities[i].city_native_name),null!=cities[i].country_native_name&&(cities[i].country=cities[i].country_native_name),null!=cities[i].subcountry_native_name&&(cities[i].subcountry=cities[i].subcountry_native_name);$scope.cities=cities}}):Geolocator.searchCities(term,native_lookup).then(function(cities){$scope.cities=cities}))},$scope.$watch("addressCountrySelected.selected",function(value,oldValue){value!=oldValue&&value&&getSubcountries(value.id)}),$scope.$watch("addressSelected.selected",function(value){if(value){var cityID=Geolocator.lookupCityID(value.name);cityID&&($scope.addressSelected.city_id=cityID),$("#select-city .select-error").remove(),$("#select-city").removeClass("error")}}),$scope.setCountry=function(country){$scope.addressCountrySelected.selected=country},$scope.addressValidation=function(){var translation=$translate.instant(["tab_address_select_company_error","tab_address_address1_error","tab_address_mailcode_error"]);$(".address-form.ui.form").form({company_select:{identifier:"company_select",rules:[{type:"empty",prompt:translation.tab_address_select_company_error}]},address1:{identifier:"address1",rules:[{type:"empty",prompt:translation.tab_address_address1_error}]},mail_code:{identifier:"mail_code",rules:[{type:"empty",prompt:translation.tab_address_mailcode_error}]}},{inline:!0,onSuccess:function(){$scope.valcheck=$scope.valcheck&&!0},onFailure:function(){$scope.valcheck=$scope.valcheck&&!1}}).form("validate form")},$scope.saveAddressInfoEnter=function(event){13==event.keyCode&&(event.target.blur(),$scope.saveAddressInfo(event))},$scope.saveAddressInfo=function(event){var translation=$translate.instant(["profile_setting_selectcity_error"]);if($scope.valcheck=!0,$("#select-city .select2-container").hasClass("select2-container-disabled")||$scope.addressSelected.selected||($(".select-error").remove(),$("#select-city").append('<div class="select-error ui red pointing prompt label transition visible">'+translation.profile_setting_selectcity_error+"</div>"),$("#select-city").addClass("error")),$scope.addressValidation(),$scope.valcheck){angular.element(event.target).addClass("disabled"),msg={loading:!0,loading_message:"in_progress"},$rootScope.floatingMessage=msg;var request;request=$scope.addressSelected.address_id?Restangular.one("account/address",$scope.addressSelected.address_id).customPUT($scope.addressSelected):Restangular.one("account/address").customPOST($scope.addressSelected),request.then(function(success){$("#setting-add-address").modal("hide"),msg={header:"tab_address_save_success"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),angular.element(event.target).removeClass("disabled"),getAddressInfo()},function(failed){msg={header:failed.data.message},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),angular.element(event.target).removeClass("disabled")})}},$scope.setPrimary=function(){msg={loading:!0,loading_message:"in_progress"},$rootScope.floatingMessage=msg;var queue=selectQueue(address_table);if(1!=queue.length)msg={header:"tab_address_set_primary"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage();else{var unsetPrimary;angular.forEach($scope.addresses,function(value){if(1==value.primary_address){var update={primary_address:0};unsetPrimary=Restangular.one("account/address",value.address_id).customPUT(update)}});var update={primary_address:1};unsetPrimary?unsetPrimary.then(function(success){Restangular.one("account/address",queue[0].address.address_id).customPUT(update)}).then(function(){msg={header:"tab_address_reset_primary"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),getAddressInfo()},function(failed){msg={header:failed.data.message},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()}):Restangular.one("account/address",queue[0].address.address_id).customPUT(update).then(function(){msg={header:"tab_address_set_primary_success"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),getAddressInfo()},function(failed){msg={header:failed.data.message},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()})}},$scope.selectCompany=function(id){$scope.addressSelected.business_organization_id=id},$scope.showPersonal=function(id){"p"==id&&(setTimeout(function(){$("#personalbtn").addClass("positive"),$("#businessbtn").removeClass("positive")},50),$scope.showpersonal=!0,$scope.showbusiness=!1,address_table="address-table-personal"),"b"==id&&(setTimeout(function(){$("#businessbtn").addClass("positive"),$("#personalbtn").removeClass("positive")},50),$scope.showpersonal=!1,$scope.showbusiness=!0,address_table="address-table-business")}}]),app.controller("TabPhoneCtrl",["$translate","$scope","$timeout","$q","Restangular","UserService","PHONE_TYPE","$rootScope",function($translate,$scope,$timeout,$q,Restangular,UserService,PHONE_TYPE,$rootScope){function getPhoneInfo(){Restangular.one("account/phone-number").customGET().then(function(success){$scope.personal_number=success.personal,$scope.business_number=success.business,success.personal?($scope.showadd=!0,$scope.showPersonal("p")):success.business&&($scope.showadd=!0,$scope.showPersonal("b"))})}getPhoneInfo(),$scope.getCompany(),$scope.formPreventDefault=function(event){if(13==event.keyCode)return event.preventDefault(),!1},$scope.savePhoneInfoEnter=function(event){13==event.keyCode&&(event.target.blur(),$scope.savePhoneInfo(event))},$scope.selectPhone=function(phone){$scope.phoneSelected=phone,phone.business_organization?$scope.showBusName=!0:$scope.showBusName=!1,angular.forEach($scope.phonetype,function(value){value.id==$scope.phoneSelected.phone_number_type_id&&($scope.phoneName=value.name)})},$scope.showpersonal=!0,$scope.showbusiness=!1,$scope.phonetype=PHONE_TYPE,
$scope.newPhone=function(){$(".ui.form").form("clear"),$scope.showBusName=!1,$scope.phoneSelected={business_organization_id:"",number:"",phone_number_type_id:"",id:""}},$scope.removePhone=function(phone){if($scope.showbusiness){var par={business_organization_id:phone.business_organization_id};return Restangular.one("account/phone-number",phone.id).remove(par)}if($scope.showpersonal)return Restangular.one("account/phone-number",phone.id).customDELETE()},$scope.confirmDeletePhone=function(){var requestQueue=($scope.deleteQueue.length,[]);angular.forEach($scope.deleteQueue,function(value,key){requestQueue.push($scope.removePhone(value.phone))}),$q.all(requestQueue).then(function(success){msg={header:"tab_phone_deleted_success"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),getPhoneInfo()},function(failed){msg={header:failed.data.message},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()})},$scope.phoneValidation=function(){var translation=$translate.instant(["tab_phone_setting_company_error","tab_phone_setting_number_error","tab_phone_setting_notvalidnumber_error"]);$(".phone-number-form.ui.form").form({company_select:{identifier:"company_select",rules:[{type:"empty",prompt:translation.tab_phone_setting_company_error}]},number:{identifier:"number",rules:[{type:"empty",prompt:translation.tab_phone_setting_number_error},{type:"integer",prompt:translation.tab_phone_setting_notvalidnumber_error}]}},{inline:!0,keyboardShortcuts:!0,onSuccess:function(){$scope.valcheck=$scope.valcheck&&!0},onFailure:function(){$scope.valcheck=$scope.valcheck&&!1}}).form("validate form")},$scope.savePhoneInfo=function(event){if($scope.valcheck=!0,$scope.phoneValidation(),$scope.valcheck){angular.element(event.target).addClass("disabled"),msg={loading:!0,loading_message:"in_progress"},$rootScope.floatingMessage=msg;var request;request=$scope.phoneSelected.id?Restangular.one("account/phone-number",$scope.phoneSelected.id).customPUT($scope.phoneSelected):Restangular.one("account/phone-number").customPOST($scope.phoneSelected),request.then(function(success){$("#setting-add-phone").modal("hide"),msg={header:"tab_phone_saved_success"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),angular.element(event.target).removeClass("disabled"),getPhoneInfo()},function(failed){$("#setting-add-phone").modal("hide"),msg={header:failed.data.message},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage(),angular.element(event.target).removeClass("disabled")})}},$scope.phoneTypeSelected=function(id){$scope.phoneSelected.phone_number_type_id=id},$scope.selectCompany=function(id){$scope.phoneSelected.business_organization_id=id},$scope.showPersonal=function(id){"p"==id&&(setTimeout(function(){$("#Npersonalbtn").addClass("positive"),$("#Nbusinessbtn").removeClass("positive")},50),$scope.showpersonal=!0,$scope.showbusiness=!1),"b"==id&&(setTimeout(function(){$("#Nbusinessbtn").addClass("positive"),$("#Npersonalbtn").removeClass("positive")},50),$scope.showpersonal=!1,$scope.showbusiness=!0)}}]),app.controller("AccountCtrl",["$translate","$scope","UserService","Restangular","$location","$timeout","$rootScope",function($translate,$scope,UserService,Restangular,$location,$timeout,$rootScope){function errorHandling(failed){var msg={header:""};if(failed.data){if(failed.data.errors)for(var prop in failed.data.errors){msg.header=failed.data.errors[prop][0].code;break}else failed.data.type?msg.header="invalid_request_error":msg.header=failed.data.code;$rootScope.floatingMessage=msg}}UserService.isLoggedIn()||$location.path("/"),$scope.formData={},$scope.formData.email=UserService.email,window.a=$scope,$scope.showPassword=!1,$scope.toggleContent=function(){$scope.showPassword^=!0},$scope.accountValidation=function(){var translation=$translate.instant(["tab_account_setting_old_pw_error","tab_account_setting_pw_error","tab_account_setting_pw_match_error"]);$(".account-form.ui.form").form({current_password:{identifier:"current_password",rules:[{type:"empty",prompt:translation.tab_account_setting_old_pw_error}]},new_password:{identifier:"new_password",rules:[{type:"empty",prompt:translation.tab_account_setting_pw_error}]},confirm_password:{identifier:"confirm_password",rules:[{type:"empty",prompt:translation.tab_account_setting_pw_error},{type:"match[new_password]",prompt:translation.tab_account_setting_pw_match_error}]}},{inline:!0,keyboardShortcuts:!0,onSuccess:function(){$scope.valcheck=$scope.valcheck&&!0},onFailure:function(){$scope.valcheck=$scope.valcheck&&!1}}).form("validate form")},$scope.changePassword=function(){if($scope.valcheck=!0,$scope.accountValidation(),$rootScope.scrollToError(),$scope.valcheck){var data={password_old:$scope.formData.old_password,password:$scope.formData.new_password,password_confirm:$scope.formData.confirm_password};Restangular.one("account").customPUT(data).then(function(success){var msg={header:"tab_account_setting_pw_reset_success"};$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()},function(failed){errorHandling(failed)})}},$scope.sentChangeEmail=function(){msg={loading:!0,loading_message:"in_progress"},$rootScope.floatingMessage=msg,Restangular.one("account").one("email").customPOST().then(function(success){msg={header:"tab_profile_setting_email_change_instructions"},$rootScope.floatingMessage=msg,$scope.hideFloatingMessage()})}}]);