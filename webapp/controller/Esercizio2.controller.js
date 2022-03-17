sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/MessageBox",
    "sap/m/MessageToast" 
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, ColumnListItem, Text, Input, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("esercitazione.controller.Esercizio2", {
            onInit: function () {
                var oModel = new JSONModel({
                    isBtnEditVisible: true,
                    isBtnSaveVisible: false,
                    isBtnCancelVisible: false,

                });
                this.getView().setModel(oModel, "Esercizio2");

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

                        this.bindTable();

                    }.bind(this),
                    error: function (oError) {
                        debugger;
                    }
                });
            },

            onPress: function (oEvent) {
                var oData = oEvent.getSource().getBindingContext("Data").getObject();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Detail", {
                    id: oData.ID
                });
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
                var oList = this.byId("table2");
                var oBinding = oList.getBinding("items")
                oBinding.filter(oFilter);
            },

            bindTable: function () {
                this.byId("table2").bindItems({
                    path: "Data>/results",
                    template: new ColumnListItem({
                        type: "Inactive",
                        press: this.onPress.bind(this),
                        cells: [new Text({
                            text: "{Data>Name}"
                        }), new Text({
                            text: "{Data>Description}"
                        }),
                        new Text({
                            text: "{Data>ReleaseDate}"
                        }),
                        new Text({
                            text: "{Data>DiscontinuedDate}"
                        }),
                        new Text({
                            text: "{Data>Rating}"
                        }),
                        new Text({
                            text: "{Data>Price}"
                        })
                        ]
                    }),
                    templateShareable: false
                });
            },

            Edit: function (oEvent) {
                this.backupModel = jQuery.extend(true, {}, this.getView().getModel("Data"));
                this.getView().getModel("Esercizio2").setProperty("/isBtnEditVisible", false);
                this.getView().getModel("Esercizio2").setProperty("/isBtnSaveVisible", true);
                this.getView().getModel("Esercizio2").setProperty("/isBtnCancelVisible", true);
                this.byId("table2").bindItems({
                    path: "Data>/results",
                    template: new ColumnListItem({
                        type: "Inactive",
                        press: this.onPress.bind(this),
                        cells: [new Input({
                            value: "{Data>Name}"
                        }), new Input({
                            value: "{Data>Description}"
                        }),
                        new Input({
                            value: "{Data>ReleaseDate}"
                        }),
                        new Input({
                            value: "{Data>DiscontinuedDate}"
                        }),
                        new Input({
                            value: "{Data>Rating}"
                        }),
                        new Input({
                            value: "{Data>Price}"
                        })
                        ]
                    }),
                    templateShareable: false
                });


            },

            Save: function (oEvent) {
                var oEditTable = this.getView().getModel("Data").getData();
                var oOriginalTable = this.backupModel.getData();
                var bCheck = false;

                for (var i = 0; i < oOriginalTable.results.length; i++) {
                    if (
                        oOriginalTable.results[i].Name === oEditTable.results[i].Name
                        && oOriginalTable.results[i].Description === oEditTable.results[i].Description
                        && oOriginalTable.results[i].ReleaseDate === oEditTable.results[i].ReleaseDate
                        && oOriginalTable.results[i].DiscontinuedDate === oEditTable.results[i].DiscontinuedDate
                        && oOriginalTable.results[i].Rating === oEditTable.results[i].Rating
                        && oOriginalTable.results[i].Price === oEditTable.results[i].Price) {

                        debugger;
                    } else {
                        bCheck = true;
                    }
                }

                if (bCheck) {
                    MessageToast.show("Salvato");
                } else {
                    MessageToast.show("Non ci sono cambiamenti");
                }

                this.getView().getModel("Esercizio2").setProperty("/isBtnEditVisible", true);
                this.getView().getModel("Esercizio2").setProperty("/isBtnSaveVisible", false);
                this.getView().getModel("Esercizio2").setProperty("/isBtnCancelVisible", false);
                this.bindTable();
            },
            Cancel: function (oEvent) {
                var oEditTable = this.getView().getModel("Data").getData();
                var oOriginalTable = this.backupModel.getData();
                var bCheck = false;

                for (var i = 0; i < oOriginalTable.results.length; i++) {
                    if (
                        oOriginalTable.results[i].Name === oEditTable.results[i].Name
                        && oOriginalTable.results[i].Description === oEditTable.results[i].Description
                        && oOriginalTable.results[i].ReleaseDate === oEditTable.results[i].ReleaseDate
                        && oOriginalTable.results[i].DiscontinuedDate === oEditTable.results[i].DiscontinuedDate
                        && oOriginalTable.results[i].Rating === oEditTable.results[i].Rating
                        && oOriginalTable.results[i].Price === oEditTable.results[i].Price) {

                    } else {
                        bCheck = true;
                    }
                }
                if (bCheck) {
                    MessageBox.warning("Cancellare i cambiamenti?", {
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            switch (sAction) {
                                case "OK":
                                    MessageToast.show("Hai cancellato i cambiamenti");
                                    var oData = jQuery.extend(true, {}, this.backupModel);
                                    this.getView().getModel("Data").setProperty("/", oData.getProperty("/"));
                                    this.bindTable();
                                    this.getView().getModel("Esercizio2").setProperty("/isBtnEditVisible", true);
                                    this.getView().getModel("Esercizio2").setProperty("/isBtnSaveVisible", false);
                                    this.getView().getModel("Esercizio2").setProperty("/isBtnCancelVisible", false);
                                    break;
                                case "CANCEL":
                                    MessageToast.show("Non hai cancellato i cambiamenti");
                                    break;
                            }
                        }.bind(this)
                    });
                }
                else {
                    MessageToast.show("Non ci sono cambiamenti");
                    var oData = jQuery.extend(true, {}, this.backupModel);
                    this.getView().getModel("Data").setProperty("/", oData.getProperty("/"));
                    this.bindTable();
                    this.getView().getModel("Esercizio2").setProperty("/isBtnEditVisible", true);
                    this.getView().getModel("Esercizio2").setProperty("/isBtnSaveVisible", false);
                    this.getView().getModel("Esercizio2").setProperty("/isBtnCancelVisible", false);
                }




            }

        });
    });  