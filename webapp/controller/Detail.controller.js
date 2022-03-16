sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("esercitazione.controller.Detail", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                oRouter.getRoute("Detail").attachMatched(function (oEvent) {
                    this._attachRouteMatched(oEvent);
                }.bind(this));
                
            },
            Back: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Esercizio1");

            },
            _attachRouteMatched: function (oEvent) {
                var sId = oEvent.getParameter("arguments").id;
                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {
                    
                    var sObjectPathApplications =this.getView().getModel("OdataPubblic").createKey("/Products", {
                        ID: sId
                    });
                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read(sObjectPathApplications, {
                        urlParameters: {
                            "$expand": "Category,Supplier"
                          },
                        success: function (oRetrievedResult) {
                            var oModel = new JSONModel(oRetrievedResult);
                            this.getView().setModel(oModel, "Detail");
                            this.getView().setBusy(false);
                            
                        }.bind(this),
                        error: function (oError) {
                            debugger;
                        }
                        
                    });

                }.bind(this));
                
            }
        });
    });  