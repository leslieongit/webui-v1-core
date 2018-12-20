Standalone CrowdFunding AngularJS v1 Core Web UI. Works with Thrinacia Atlas REST API. In order to use this product you need active subscription from https://www.thrinacia.com.

License          
================
 
In order to use Thrinacia Inc. products, source code or services you need to purchase active license from: https://www.thrinacia.com/pricing. For more information regarding the license or terms and conditions please visit the following URL: https://www.thrinacia.com/terms

Demo Version
================

If you would like to try a demo version of this standalone Web UI with our origin demo website, please do the following:

1. Git clone this repository
2. Setup webserver/vhost with web root pointed to <your-cloned-git-repo/angapp
3. Inside the angapp directory add the following file called "app_local.js" with the contents below.

```javascript
app.constant( 'API_URL', {
  url : "https://origin.thrinacia.com/api",
  loc : "/service/restv1/"
} );

//define the default and prefered language
app.constant( 'LANG', {
  DEFAULT_LANG : "en",
  PREFERRED_LANG :"en"
} );

// CDN settings
app.constant('CDN', {
  APP_URL : "https://cdn5.thrinacia.com/**"
} );
```

4. Reload your vhost and try the demo website, it should work now

5. If you have any questions or other requests please email us at: support@thrinacia.com
