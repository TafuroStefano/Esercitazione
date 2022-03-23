sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Sorter, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("esercitazione.controller.Esercizio6", {

            onInit: function () {

                var oModel = new JSONModel({
                    sJson: ""
                });

                this.getView().setModel(oModel, "Esercizio6");
            },

            BackHome: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("HomePage");
            },

            Success: function (oRetrievedResult) {
                try {
                    var sJson = JSON.stringify(oRetrievedResult, null, "\t")
                } catch (error) {
                    MessageBox(error);
                }

                this.getView().getModel("Esercizio6").setProperty("/sJson", sJson);
                this.getView().setBusy(false);
            },

            STEP1: function () {
                this.getView().setBusy(true);
                this.getView().getModel("OdataPubblic").read("/Products", {

                    success: this.Success.bind(this),

                    error: function (oError) {
                        debugger;
                    }
                });
            },
            STEP2: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {
                    var sObjectPathApplications = this.getView().getModel("OdataPubblic").createKey("/Products", {
                        ID: 4
                    });

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read(sObjectPathApplications, {
                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP3: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {
                        sorters: [new Sorter({
                            path: "Price",
                            descending: true
                        })],

                        urlParameters: {
                            "$top": "3"
                        },
                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP4: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {
                        sorters: [new Sorter({
                            path: "Price",
                            descending: true
                        })],

                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP5: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {
                        filters: [new Filter({
                            path: "Price",
                            operator: FilterOperator.GT,
                            value1: 30
                        })],

                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP6: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {

                        success: function (oRetrievedResult) {
                            var oInDesc = {
                                results: []
                            };

                            for (let index = 0; index < oRetrievedResult.results.length; index++) {
                                if (oRetrievedResult.results[index].Description.indexOf("3") !== -1) {
                                    oInDesc.results.push(oRetrievedResult.results[index])
                                }

                            }
                            this.Success(oInDesc)
                        }.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP7: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {
                        filters: [
                            new Filter({
                                path: "ID",
                                operator: FilterOperator.BT,
                                value1: 2,
                                value2: 6
                            }),
                            new Filter({
                                path: "Price",
                                operator: FilterOperator.GT,
                                value1: 20
                            })
                        ],

                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP8: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {
                        filters: [
                            new Filter({
                                path: "ID",
                                operator: FilterOperator.BT,
                                value1: 2,
                                value2: 6
                            }),
                            new Filter({
                                path: "Price",
                                operator: FilterOperator.GT,
                                value1: 20
                            }),

                        ],
                        urlParameters: {
                            "$select": "ID,Name,Price"
                        },

                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP9: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {
                        sorters: [new Sorter({
                            path: "ID",
                            descending: true
                        })],
                        urlParameters: {
                            "$expand": "Category"
                        },
                        filters: [
                            new Filter({
                                path: "Category/Name",
                                operator: FilterOperator.EQ,
                                value1: "Electronics"
                            })
                        ],


                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP10: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {
                        sorters: [new Sorter({
                            path: "Price",
                            descending: true
                        })],

                        urlParameters: {
                            "$top": "5"
                        },
                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP11: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {
                        sorters: [new Sorter({
                            path: "Price",
                            descending: true
                        })],
                        urlParameters: {
                            "$expand": "Supplier"
                        },
                        filters: [
                            new Filter({
                                path: "Supplier/Name",
                                operator: FilterOperator.EQ,
                                value1: "Exotic Liquids"
                            })
                        ],


                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP12: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {
                        sorters: [new Sorter({
                            path: "Price",
                            descending: true
                        })],
                        urlParameters: {
                            "$expand": "Supplier",
                            "$inlinecount": "allpages"
                        },
                        filters: [
                            new Filter({
                                path: "Supplier/Name",
                                operator: FilterOperator.EQ,
                                value1: "Exotic Liquids"
                            })
                        ],


                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },

            STEP13: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {
                        filters: [
                            new Filter({
                                path: "ID",
                                operator: FilterOperator.BT,
                                value1: 2,
                                value2: 6
                            }),
                            new Filter({
                                path: "Price",
                                operator: FilterOperator.GT,
                                value1: 20
                            })
                        ],
                        and: false,

                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP14: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {

                        /* urlParameters: {
                            "$inlinecount": "allpages",
                        }, */
                        success: function (oRetrievedResult) {
                            var oInDesc = {
                                results: [],
                                length: 0
                            };


                            for (let index = 0; index < oRetrievedResult.results.length; index++) {
                                if (oRetrievedResult.results[index].Description.indexOf("3") !== -1) {
                                    oInDesc.results.push(oRetrievedResult.results[index]);
                                }

                            }
                            oInDesc.length = oInDesc.results.length;

                            this.Success(oInDesc);

                        }.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP15: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products(4)/Category", {

                        /* urlParameters: {
                            "$select": "Category",
                            "$expand": "Category"
                        },
                        filters: [
                            new Filter({
                                path: "ID",
                                operator: FilterOperator.EQ,
                                value1: "4"
                            })
                        ], */


                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },
            STEP16: function () {

                this.getView().getModel("OdataPubblic").metadataLoaded().then(function () {

                    this.getView().setBusy(true);
                    this.getView().getModel("OdataPubblic").read("/Products", {

                        urlParameters: {
                            "$inlinecount": "allpages",
                        },

                        success: this.Success.bind(this),

                        error: function (oError) {
                            debugger;
                        }

                    });

                }.bind(this));
            },


        });
    });