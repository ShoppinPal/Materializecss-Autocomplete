(function () {
    'use strict';
    angular.module('material.autocomplete', ['material.autocomplete.templates'])
        .run(['$templateCache', '$compile', '$rootScope', function ($templateCache, $compile, $rootScope) {
            var templatesHTML = $templateCache.get('ac-templates');
            $compile(templatesHTML)($rootScope);
        }]);
})();
