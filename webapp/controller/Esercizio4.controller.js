sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/dnd/DropInfo",
    "sap/ui/core/dnd/DragDropInfo",
    "sap/ui/core/CustomData",
    "sap/m/MessageToast"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, DropInfo, DragDropInfo, CustomData, MessageToast) {
        "use strict";

        return Controller.extend("esercitazione.controller.Esercizio4", {

            onInit: function () {

                var oModel = new JSONModel({
                    results: [],
                });

                this.getView().setModel(oModel, "SecondaLista");

                var oEsercizio4 = new JSONModel({

                    isSwitchON: true,
                    sKey: "Move"

                });

                this.getView().setModel(oEsercizio4, "Esercizio4");

            },

            BackHome: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("HomePage");
            },
            onAfterRendering: function () {
                this.getView().setBusy(true);
                this.getView().getModel("OdataPubblic").read("/Products", {
                    success: function (oRetrievedResult) {


                        var oModel = new JSONModel(oRetrievedResult);
                        this.getView().setModel(oModel, "PrimaLista");
                        this.getView().setBusy(false);
                        this.backupModel = jQuery.extend(true, {}, this.getView().getModel("PrimaLista"));

                    }.bind(this),


                    error: function (oError) {
                        debugger;
                    }
                });
            },
            onReorderItems: function (oEvent) {
                var sDropPosition = oEvent.getParameter("dropPosition");
                var oDraggedControl = oEvent.getParameter("draggedControl");
                var oDroppedControl = oEvent.getParameter("droppedControl");
                var aCustomData = oDraggedControl.getCustomData()
                var aCustomDataDest = oEvent.getSource().getCustomData()
                var oPrimaLista = this.getView().getModel("PrimaLista").getData();
                var oSecondaLista = this.getView().getModel("SecondaLista").getData();


                var oProvenienza = aCustomData.find(x => x.getKey() === "list").getValue();
                var oDestinazione = aCustomDataDest.find(x => x.getKey() === "list");
                var oItem = oDraggedControl.getBindingContext(oProvenienza).getObject();
                


                if (!oDestinazione) {
                    if (oPrimaLista.results.length === 0) {
                        oDestinazione = "SecondaLista";
                    } else {
                        oDestinazione = "PrimaLista";
                    }
                } else {
                    oDestinazione = oDestinazione.getValue();
                }
                
                
                
                if (this.getView().getModel("Esercizio4").getProperty("/sKey") === "Move") {
                    if (oProvenienza === "PrimaLista") {
                       
                        var iIndex = oPrimaLista.results.indexOf(oItem);
                        oPrimaLista.results.splice(iIndex, 1);
        
                    } else {
                        var iIndex = oSecondaLista.results.indexOf(oItem);
                        oSecondaLista.results.splice(iIndex, 1);
                    }
                }


                if (oDestinazione === "SecondaLista") {

                    if (!oDroppedControl.getBindingContext("SecondaLista"))
                        oSecondaLista.results.unshift(oItem);
                    else {

                        var oPos = oDroppedControl.getBindingContext("SecondaLista").getObject();
                        var iIndexPos = oSecondaLista.results.indexOf(oPos);

                        switch (sDropPosition) {
                            case "On":
                            case "After":
                                iIndexPos++;
                                oSecondaLista.results.splice(iIndexPos, 0, oItem);
                                break;
                            case "Before":
                                iIndexPos = iIndexPos > 0 ? iIndexPos-- : 0;
                                oSecondaLista.results.splice(iIndexPos, 0, oItem);
                                break;
                        }
                    }
                    
                } else {
                    if (!oDroppedControl.getBindingContext("PrimaLista"))
                        oPrimaLista.results.unshift(oItem);
                    else {

                        var oPos = oDroppedControl.getBindingContext("PrimaLista").getObject();
                        var iIndexPos = oPrimaLista.results.indexOf(oPos);

                        switch (sDropPosition) {
                            case "On":
                            case "After":
                                iIndexPos++;
                                oPrimaLista.results.splice(iIndexPos, 0, oItem);
                                break;
                            case "Before":
                                iIndexPos = iIndexPos > 0 ? iIndexPos-- : 0;
                                oPrimaLista.results.splice(iIndexPos, 0, oItem);
                                break;
                        }

                    }
                }
                this.getView().getModel("PrimaLista").refresh();
                this.getView().getModel("SecondaLista").refresh();
            },
        });


    });