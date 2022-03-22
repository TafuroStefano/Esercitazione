sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("esercitazione.controller.Esercizio5", {

            onInit: function () {

                var oModel = new JSONModel({
                    stext: ""
                });

                this.getView().setModel(oModel, "Esercizio5");
            },

            BackHome: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("HomePage");
            },
        });


    });