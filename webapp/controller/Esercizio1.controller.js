sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/DatePicker",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast, Label, Input, Button, Dialog, DatePicker, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("esercitazione.controller.Esercizio1", {
            onInit: function () {

            },
            BackHome: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("HomePage");

            },
            onAfterRendering: function () {
                this.getView().setBusy(true);
                this.getView().getModel("OdataPubblic").read("/Products", {
                    success: function (oRetrievedResult) {
                        for (let index = 0; index < oRetrievedResult.results.length; index++) {
                            if (!oRetrievedResult.results[index].ReleaseDate ||
                                oRetrievedResult.results[index].ReleaseDate === undefined) {
                                oRetrievedResult.results[index].ReleaseDate = "";
                            } else {
                                oRetrievedResult.results[index].ReleaseDate = new Date(oRetrievedResult.results[index].ReleaseDate).toLocaleDateString("it-IT", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit"
                                })
                            }

                            if (!oRetrievedResult.results[index].DiscontinuedDate ||
                                oRetrievedResult.results[index].DiscontinuedDate === undefined) {
                                oRetrievedResult.results[index].DiscontinuedDate = "";
                            } else {
                                oRetrievedResult.results[index].DiscontinuedDate = new Date(oRetrievedResult.results[index].DiscontinuedDate).toLocaleDateString("it-IT", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit"
                                })
                            }

                        }

                        var oModel = new JSONModel(oRetrievedResult);
                        this.getView().setModel(oModel, "Data");
                        this.getView().setBusy(false);

                    }.bind(this),
                    error: function (oError) {
                        debugger;
                    }
                });
            },
            DeleteMessageBoxPress: function (oEvent) {
                var oBaseEvent = jQuery.extend(true, {}, oEvent);
                MessageBox.warning("Delete rows?", {
                    actions: [MessageBox.Action.YES, MessageBox.Action.ABORT],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (sAction) {
                        if (sAction == "YES") {
                            this.Delete(oBaseEvent);
                            debugger;
                        }
                        MessageToast.show("Action selected: " + sAction);
                        debugger;
                    }.bind(this)

                });
            },
            Delete: function (oEvent) {

                var oRecords = oEvent.getSource().getBindingContext("Data").getObject();
                var oTable = this.getView().getModel("Data").getData();
                var iIndex = oTable.results.indexOf(oRecords);
                oTable.results.splice(iIndex, 1);
                this.getView().getModel("Data").refresh();
            },
            onPress: function (oEvent) {
                var oData = oEvent.getSource().getBindingContext("Data").getObject();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Detail", {
                    id: oData.ID
                });
            },
            Clone: function (oEvent) {
                var oRecords = oEvent.getSource().getBindingContext("Data").getObject();
                var oTable = this.getView().getModel("Data").getData();
                oTable.results.push(oRecords);
                this.getView().getModel("Data").refresh();
            },
            CloneFirstRow: function (oEvent) {
                var oTable = this.getView().getModel("Data").getData();
                var oFirstRow = oTable.results[0];
                oTable.results.unshift(oFirstRow);
                this.getView().getModel("Data").refresh();
            },
            Create: function (oEvent) {
                var oRetrievedResult = {
                    Name: "",
                    Description: "",
                    ReleaseDate: "",
                    DiscontinuedDate: "",
                    Rating: 0,
                    Price: 0,
                    beginButtonEnable: false
                };
                var oModel = new JSONModel(oRetrievedResult);
                this.getView().setModel(oModel, "Empity");


                var oDialog = new Dialog({
                    contentWidth: "40%",
                    title: "Inserisci valori:",
                    draggable: true,
                    type: "Message",
                    content: [new Label({
                        text: "Name"
                    }), new Input({
                        value: "{Empity>/Name}",
                        enabled: true,
                        required: true,
                        placeholder: "Name",
                        liveChange: function (oEventLiveChange) {
                            var sText = oEventLiveChange.getParameter("value").trim();
                            this.getView().getModel("Empity").setProperty("/Name", sText);
                            this.CheckData();
                        }.bind(this),
                    }),
                    new Label({
                        text: "Description"
                    }), new Input({
                        value: "{Empity>/Description}",
                        enabled: true,
                        required: true,
                        placeholder: "Description",
                        liveChange: function (oEventLiveChange) {
                            var sText = oEventLiveChange.getParameter("value").trim();
                            this.getView().getModel("Empity").setProperty("/Description", sText);
                            this.CheckData();
                        }.bind(this),
                    }),
                    new Label({
                        text: "ReleaseDate"
                    }), new DatePicker({
                        value: "{Empity>/ReleaseDate}",
                        enabled: true,
                        placeholder: "ReleaseDate",
                        change: function (oEventLiveChange) {
                            this.CheckData();
                        }.bind(this),
                    }),
                    new Label({
                        text: "DiscontinuedDate"
                    }), new DatePicker({
                        value: "{Empity>/DiscontinuedDate}",
                        enabled: true,
                        placeholder: "DiscontinuedDate",
                        change: function (oEventLiveChange) {
                            this.CheckData();
                        }.bind(this),
                    }),
                    new Label({
                        text: "Rating"
                    }), new Input({
                        type: "Number",
                        value: "{Empity>/Rating}",
                        enabled: true,
                        required: true,
                        placeholder: "Rating",
                        liveChange: function (oEventLiveChange) {
                            var sText = oEventLiveChange.getParameter("value").trim();
                            this.getView().getModel("Empity").setProperty("/Rating", sText);
                            this.CheckData();
                        }.bind(this),
                    }),
                    new Label({
                        text: "Price"
                    }), new Input({
                        type: "Number",
                        value: "{Empity>/Price}",
                        enabled: true,
                        required: true,
                        placeholder: "Price",
                        liveChange: function (oEventLiveChange) {
                            var sText = oEventLiveChange.getParameter("value").trim();
                            this.getView().getModel("Empity").setProperty("/Price", sText);
                            this.CheckData();
                        }.bind(this),
                    }),],
                    beginButton: new Button({
                        type: "Accept",
                        text: "Inserisci dati",
                        enabled: "{Empity>/beginButtonEnable}",
                        press: function (oEventPress) {
                            var oContainer = this.getView().getModel("Empity").getData();
                            delete oContainer.beginButtonEnable;
                            var oTable = this.getView().getModel("Data").getData();
                            oTable.results.unshift(oContainer);
                            this.getView().getModel("Data").refresh();
                            oDialog.close();
                            MessageToast.show("Dati inseriti", {
                                duration: 4000
                            });

                        }.bind(this)
                    }),
                    endButton: new Button({
                        text: "Annulla",
                        type: "Reject",
                        press: function () {
                            oDialog.close();
                        }
                    }),
                    afterClose: function () {
                        this.getView().removeDependent(oDialog);
                        oDialog.destroy();
                    }.bind(this),
                    beforeOpen: function () {
                        this.getView().addDependent(oDialog);
                    }.bind(this)
                });

                oDialog.open();
            },
            CheckData: function () {
                var oCheck = this.getView().getModel("Empity").getData();
                if (oCheck.Name !== "" && oCheck.Description !== "" && oCheck.ReleaseDate !== "" && oCheck.DiscontinuedDate !== "" &&
                    oCheck.Rating !== "" && oCheck.Price !== "") {
                    this.getView().getModel("Empity").setProperty("/beginButtonEnable", true);
                } else {
                    this.getView().getModel("Empity").setProperty("/beginButtonEnable", false);
                }
            },
            onFilterInvoices: function (oEvent) {
                var oFilter = [];
                var sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    var aFilter0 = (new Filter("Name", FilterOperator.Contains, sQuery));
                    var aFilter1 = (new Filter("Description", FilterOperator.Contains, sQuery));
                    var aFilter2 = (new Filter("ReleaseDate", FilterOperator.Contains, sQuery));
                    var aFilter3 = (new Filter("DiscontinuedDate", FilterOperator.Contains, sQuery));
                    var aFilter4 = (new Filter("Rating", FilterOperator.EQ, sQuery));
                    var aFilter5 = (new Filter("Price", FilterOperator.EQ, sQuery));
                    oFilter = new Filter({
                        filters: [
                            aFilter0, aFilter1, aFilter2, aFilter3, aFilter4, aFilter5
                        ],
                        and: false
                    });
                }
                //aFilter0.push(new Filter("Name", FilterOperator.Contains, sQuery));
                var oList = this.byId("invoiceList");
                var oBinding = oList.getBinding("items")
                oBinding.filter(oFilter);
            }


        });
    });  