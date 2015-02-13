(function() {
"use strict";

requirejs.config({
	baseUrl: "js",
	paths: {
		modernizr: "vendor/modernizr-2.8.3.min"
	},
	shim: {
		"modernizr": {
			exports: "Modernizr"
		}
	}
});

requirejs(["lib/flexibledecorator"], function(flexible) {
	flexible(document.getElementById("flexible_input"));
});
		

})();
