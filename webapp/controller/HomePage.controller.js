sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("esercitazione.controller.HomePage", {
            onInit: function () {

            }, 
            Es1: function (oEvent) { 
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Esercizio1");
            }
            
        });
    });
