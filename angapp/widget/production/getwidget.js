!function(){function setLoaderDom(){var loaderLink=document.createElement("link");loaderLink.rel="stylesheet",loaderLink.href=loadercss,loaderLink.className="sedraloadercss",document.querySelector("head").appendChild(loaderLink);var widgetLoaderDom=document.createElement("div");widgetLoaderDom.className="sedra-widget-loader",document.querySelector("sedra-widget").appendChild(widgetLoaderDom)}function getWidgetHost(){for(var appLocalUrl="",getWidgetMatch=/widget\/production\/getwidget.js/,getWidgetMatch2=/widget.js/,scriptTags=document.getElementsByTagName("script"),i=0;i<scriptTags.length;i++)if(getWidgetMatch.test(scriptTags[i].src)||getWidgetMatch2.test(scriptTags[i].src)){thrinaciaHostUrl=scriptTags[i].src.indexOf("widget/production/getwidget.js")>-1?scriptTags[i].src.substr(0,scriptTags[i].src.indexOf("widget/production/getwidget.js")):scriptTags[i].src.substr(0,scriptTags[i].src.indexOf("widget.js")),appLocalUrl=thrinaciaHostUrl+"app_local.js";break}var xhr=new XMLHttpRequest;xhr.open("GET",appLocalUrl),xhr.withCredentials=!1,xhr.onreadystatechange=function(){4==xhr.readyState&&(xhr.status>=200&&xhr.status<400?(getUrlFromString(xhr.responseText),initWidget()):(console.log("app_local.js is not defined"),initWidget()))},xhr.send()}function getUrlFromString(successString){var apiUrlStart=successString.indexOf("app.constant('API_URL',"),apiUrlLocEnd=successString.indexOf("loc"),tempString=successString.substr(apiUrlStart,apiUrlLocEnd-apiUrlStart),httpsStart=tempString.indexOf("http"),urlEnd=tempString.indexOf(",",httpsStart);httpsStart!=-1&&urlEnd!=-1&&(window.widgetHost=tempString.substr(httpsStart,urlEnd-httpsStart-1));var sedraUrlStart=successString.indexOf("app.constant('SEDRA',");if(sedraUrlStart!=-1){var sedraUrlLocEnd=successString.lastIndexOf("loc"),sedratempString=successString.substr(sedraUrlStart,sedraUrlLocEnd-sedraUrlStart),sedraHttpsStart=sedratempString.indexOf("http"),sedraUrlEnd=sedratempString.indexOf(",",sedraHttpsStart);sedraHttpsStart!=-1&&sedraUrlEnd!=-1&&(window.widgetUrl=sedratempString.substr(sedraHttpsStart,sedraUrlEnd-sedraHttpsStart-1))}var defaultLangIndex=successString.indexOf("DEFAULT_LANG"),lang={};if(defaultLangIndex!=-1){var defaultLangSubString=successString.substr(defaultLangIndex+13,successString.length-defaultLangIndex);if(defaultLangSubString.indexOf('"')<5&&defaultLangSubString.indexOf('"')!=-1)var defaultLang=defaultLangSubString.substr(defaultLangSubString.indexOf('"')+1,2);else var defaultLang=defaultLangSubString.substr(defaultLangSubString.indexOf("'")+1,2);lang.defaultLang=defaultLang}var preferredLangIndex=successString.indexOf("PREFERRED_LANG");if(preferredLangIndex!=-1){var preferredLangSubString=successString.substr(preferredLangIndex+15,successString.length-preferredLangIndex);if(preferredLangSubString.indexOf('"')<5&&preferredLangSubString.indexOf('"')!=-1)var preferredLang=preferredLangSubString.substr(preferredLangSubString.indexOf('"')+1,2);else var preferredLang=preferredLangSubString.substr(preferredLangSubString.indexOf("'")+1,2);lang.preferredLang=preferredLang}window.DefaultPreferredLang=lang}function initWidget(){var sedrajsScripts=document.querySelectorAll("script.sedra-js");sedrajsScripts.length||(loadangular(),loadStripe())}function load(){window.jQuery||window.$?loadDep():loadjquery()}function loadjquery(){loadScript("sedra-jquery",jqueryurl,loadDep)}function loadangular(){loadScript("sedra-es6shim",es6shimjs,null),loadScript("sedra-reflect",reflectjs,load)}function loadWidget(){loadScript("sedra-widget",widgetUrl,null)}function loadStripe(){loadScript(null,"https://js.stripe.com/v3/",null)}function loadScript(tagId,url,callback){var script=document.createElement("script");script.type="text/javascript",script.className="sedra-js",script.id=tagId,script.readyState?script.onreadystatechange=function(){"loaded"!=script.readyState&&"complete"!=script.readyState||(script.onreadystatechange=null,null!==callback&&callback())}:script.onload=function(){null!==callback&&callback()},script.src=url,document.getElementsByTagName("head")[0].appendChild(script)}function loadDep(){var sedracssSelector=document.querySelector("link.sedracss");if(!sedracssSelector){var sedracssLink=document.createElement("link");sedracssLink.rel="stylesheet",sedracssLink.href=widgetcss,sedracssLink.className="sedracss",document.querySelector("head").appendChild(sedracssLink)}var isSemanticExist=!1,$script=jQuery("script");$script.each(function(index){var attr=jQuery(this).attr("src");if(attr&&attr.indexOf("semantic")!=-1)return isSemanticExist=!0,!1}),isSemanticExist?loadWidget():jQuery.getScript(semanticjs).success(function(data){loadWidget()})}var ERROR_CODE='You are using old version of the widget code, please make sure to get the latest version from your campaign page. Alternatively you can manually rename any references to "atlas-widget" or "reach-widget" to "sedra-widget" instead in your widget code. Thank you.';if(!document.querySelector("sedra-widget")){var oldWidget=document.querySelector("reach-widget")?document.querySelector("reach-widget"):document.querySelector("atlas-widget"),errorDom=document.createElement("h3");return errorDom.innerText=ERROR_CODE,oldWidget.appendChild(errorDom),void console.error(ERROR_CODE)}var thrinaciaHostUrl="";getWidgetHost();var jqueryurl=thrinaciaHostUrl+"widget/production/jquery.min.js",es6shimjs=thrinaciaHostUrl+"widget/production/es6-shim.min.969b6392.js",reflectjs=thrinaciaHostUrl+"widget/production/Reflect.969b6392.js",widgetUrl=thrinaciaHostUrl+"widget/production/sedra.969b6392.js",widgetcss=thrinaciaHostUrl+"widget/production/sedra.969b6392.css",semanticjs=thrinaciaHostUrl+"widget/production/semantic.min.js",loadercss=thrinaciaHostUrl+"widget/production/loader.969b6392.css";setLoaderDom()}();