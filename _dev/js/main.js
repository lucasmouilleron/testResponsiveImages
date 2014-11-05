/////////////////////////////////////////////////////////////////////
// REQUIREJS CONFIG
/////////////////////////////////////////////////////////////////////
require.config({
    paths: {
        "jquery": "libs/vendor/jquery/dist/jquery",
        "bootstrap": "libs/vendor/bootstrap/dist/js/bootstrap.min",
        "console": "libs/vendor/console/console.min",
        "throbber": "libs/vendor/throbber.js/throbber",
        "picturefill": "libs/vendor/picturefill/dist/picturefill",
        "tools": "libs/tools"
    },
    shim: {
        "bootstrap": ["jquery"],
        "throbber": ["jquery"],
        "tools": ["jquery", "console"]
    }
});

/////////////////////////////////////////////////////////////////////
// ENTRY POINT
/////////////////////////////////////////////////////////////////////
require(["jquery", "tools", "bootstrap","picturefill"], function($, tools) {
    $(function() {
        //tools.displayMainLoader();
        //setTimeout(function(){tools.hideMainLoader()}, 2000);
        c("ok");
    });
});