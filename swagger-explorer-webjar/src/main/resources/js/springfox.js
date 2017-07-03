$(function () {
    var springfox = {
        "baseUrl": function () {
            var urlMatches = /(https?:\/\/[^/]+\/[^/]+).*/.exec(window.location.href);
            return urlMatches[1];
        },
        "apiDocsUrl": function () {
            return this.baseUrl() + "${api-docs.url}";
        },
        "securityConfig": function (cb) {
            $.getJSON(this.baseUrl() + "/swagger-resources/configuration/security", function (data) {
                cb(data);
            });
        },
        "uiConfig": function (cb) {
            $.getJSON(this.baseUrl() + "/swagger-resources/configuration/ui", function (data) {
                cb(data);
            });
        }
    };

    window.springfox = springfox;
    window.oAuthRedirectUrl = springfox.baseUrl() + './dist/o2c.html'

    window.springfox.uiConfig(function (data) {
        window.swaggerUi = new SwaggerUi({
            url: window.springfox.apiDocsUrl(),
            dom_id: "swagger-ui-container",
            supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
            onComplete: function (swaggerApi, swaggerUi) {

                window.springfox.securityConfig(function (datas) {
                    if (typeof initOAuth == "function") {
                        initOAuth({
                            clientId: "ffe7748a-3a3f-4860-a02a-42ab08e4fde2",
                            realm: "realm",
                            appName: "Swagger"
                        });
                    }
                });

                $('pre code').each(function (i, e) {
                    hljs.highlightBlock(e)
                });

                if (swaggerUi.options.url) {
                    $('#input_baseUrl').val(swaggerUi.options.url);
                }
                if (swaggerUi.options.apiKey) {
                    $('#input_apiKey').val(swaggerUi.options.apiKey);
                }

                $("[data-toggle='tooltip']").tooltip();

                addApiKeyAuthorization();
            },
            onFailure: function (data) {
                log("Unable to Load SwaggerUI");
            },
            docExpansion: "none",
            sorter: "alpha"
        });

        function addApiKeyAuthorization() {
            if ($('#input_apiKey') && $('#input_apiKey')[0]) {
                var key = encodeURIComponent($('#input_apiKey')[0].value);
                if (key && key.trim() != "") {
                    var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization("Authorization", "Bearer " + key, "header");
                    window.swaggerUi.api.clientAuthorizations.add("key", apiKeyAuth);
                    log("added key " + key);
                }
            }
        }

        $('#input_apiKey').change(addApiKeyAuthorization);
        // if you have an apiKey you would like to pre-populate on the page for demonstration purposes...
        /*
         var apiKey = "myApiKeyXXXX123456789";
         $('#input_apiKey').val(apiKey);
         */

        window.swaggerUi.load();

        function log() {
            if ('console' in window) {
                console.log.apply(console, arguments);
            }
        }
    });
});
