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
        "dense":"libs/vendor/dense/src/dense"
    },
    shim: {
        "bootstrap": ["jquery"],
        "dense": ["jquery"]
    }
});

/////////////////////////////////////////////////////////////////////
// ENTRY POINT
/////////////////////////////////////////////////////////////////////
require(["jquery","bootstrap","picturefill","dense"], function($, tools) {
    $(function() {
        $(".retina img").dense({glue:"_"});
        console.log("ok");
    });
});