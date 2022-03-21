sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Label",
    "sap/m/Button",
    "sap/m/DatePicker",
    "sap/m/MenuItem",
    'sap/ui/core/Fragment',
	"sap/ui/export/Spreadsheet",
	"sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    "sap/m/Select",
    "sap/ui/layout/form/SimpleForm",
    "sap/ui/core/Item"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, ColumnListItem, Text, Input, MessageBox, MessageToast, Dialog,
        Label, Button, DatePicker, MenuItem, Fragment,Spreadsheet, Export, ExportTypeCSV,Select, SimpleForm, Item) {
        "use strict";

        return Controller.extend("esercitazione.controller.Esercizio3", {

            onInit: function () {

                var oModel = new JSONModel({
                    isBtnEditVisible: true,
                    isBtnSaveVisible: false,
                    isBtnCancelVisible: false,
                    isBtnAddVisible: false,
                    idTable: 0,
                    exportType: [{ key: "EXCEL", value: "Excel" }, { key: "CSV", value: "CSV" }],
                    themeSelected: ""
                    
                });

                this.getView().setModel(oModel, "Esercizio3");

            },

            BackHome: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("HomePage");
            },

            onAfterRendering: function () {

                this.getView().getModel("Esercizio3").setProperty("/idTable", 0);

                this.getView().setBusy(true);
                this.getView().getModel("OdataPubblic").read("/Products", {
                    success: function (oRetrievedResult) {
                        var iContatore = this.getView().getModel("Esercizio3").getProperty("/idTable");

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
                            oRetrievedResult.results[index].isDeleted = false;
                            oRetrievedResult.results[index].idTable = iContatore;
                            iContatore++;

                        }

                        var oModel = new JSONModel(oRetrievedResult);
                        this.getView().setModel(oModel, "Data");
                        this.getView().setBusy(false);
                        this.bindTable();
                        this.getView().getModel("Esercizio3").setProperty("/idTable", iContatore);

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
                var oList = this.byId("table3");
                var oBinding = oList.getBinding("items")
                oBinding.filter(oFilter);
            },

            bindTable: function () {
                this.byId("table3").bindItems({
                    path: "Data>/results",
                    filters: [new Filter({
                        path: "isDeleted",
                        operator: FilterOperator.EQ,
                        value1: false
                    })],
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
                this.getView().getModel("Esercizio3").setProperty("/isBtnEditVisible", false);
                this.getView().getModel("Esercizio3").setProperty("/isBtnSaveVisible", true);
                this.getView().getModel("Esercizio3").setProperty("/isBtnCancelVisible", true);
                this.getView().getModel("Esercizio3").setProperty("/isBtnAddVisible", true);
                this.byId("table3").bindItems({
                    path: "Data>/results",
                    filters: [new Filter({
                        path: "isDeleted",
                        operator: FilterOperator.EQ,
                        value1: false
                    })],
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
                var x = 1;
                var iIdCounter = 0;

                this.getView().getModel("OdataPubblic").setDeferredGroups(["group1"]);
                for (var z = 0; z < oEditTable.results.length; z++) {
                    if (iIdCounter <= oEditTable.results[z].ID) {
                        iIdCounter = oEditTable.results[z].ID;
                    }

                }

                for (var i = 0; i < oEditTable.results.length; i++) {
                    x++;

                    if (oEditTable.results[i].ID === null || oEditTable.results[i].ID === undefined && oEditTable.results[i].isDeleted === false) {
                        iIdCounter++;
                        bCheck = true;
                        //fa la create
                        this.getView().getModel("OdataPubblic").create("/Products", {
                            Name: oEditTable.results[i].Name,
                            Description: oEditTable.results[i].Description,
                            //ReleaseDate: oEditTable.results[i].ReleaseDate,
                            //DiscontinuedDate: oEditTable.results[i].DiscontinuedDate,
                            Rating: oEditTable.results[i].Rating,
                            Price: oEditTable.results[i].Price.toString(),
                            ID: iIdCounter
                        }, {
                            headers: {
                                "Content-ID": x
                            },
                            groupId: "group1",
                            refreshAfterChange: false
                        });

                        continue;
                    }
                    if (oEditTable.results[i].isDeleted === true) {
                        bCheck = true;
                        var sPath = this.getView().getModel("OdataPubblic").createKey("/Products", {
                            ID: oEditTable.results[i].ID

                        });
                        this.getView().getModel("OdataPubblic").remove(sPath, {
                            headers: {
                                "Content-ID": x
                            },
                            groupId: "group1",
                            refreshAfterChange: false
                        });

                        continue;
                    }


                    var oTmp = oOriginalTable.results.find(x => x.ID === oEditTable.results[i].ID)


                    if (
                        oTmp.Name === oEditTable.results[i].Name
                        && oTmp.Description === oEditTable.results[i].Description
                        && oTmp.ReleaseDate === oEditTable.results[i].ReleaseDate
                        && oTmp.DiscontinuedDate === oEditTable.results[i].DiscontinuedDate
                        && oTmp.Rating === oEditTable.results[i].Rating
                        && oTmp.Price === oEditTable.results[i].Price) {

                    } else {
                        var sPath = this.getView().getModel("OdataPubblic").createKey("/Products", {
                            ID: oEditTable.results[i].ID
                        });

                        this.getView().getModel("OdataPubblic").update(sPath, {
                            Name: oEditTable.results[i].Name,
                            Description: oEditTable.results[i].Description,
                            //ReleaseDate: oEditTable.results[i].ReleaseDate,
                            //DiscontinuedDate: oEditTable.results[i].DiscontinuedDate,
                            Rating: oEditTable.results[i].Rating,
                            Price: oEditTable.results[i].Price
                        }, {
                            headers: {
                                "Content-ID": x
                            },
                            groupId: "group1",
                            refreshAfterChange: false
                        });


                        bCheck = true;
                    }
                }

                if (bCheck) {

                    this.getView().setBusy(true);

                    this.getView().getModel("OdataPubblic").submitChanges({
                        groupId: "group1",
                        success: function (oDataResponse) {
                            this.getView().setBusy(false);
                            MessageToast.show("Salvato");
                            this.getView().getModel("Esercizio3").setProperty("/isBtnEditVisible", true);
                            this.getView().getModel("Esercizio3").setProperty("/isBtnSaveVisible", false);
                            this.getView().getModel("Esercizio3").setProperty("/isBtnCancelVisible", false);
                            this.getView().getModel("Esercizio3").setProperty("/isBtnAddVisible", true);
                            this.onAfterRendering();
                        }.bind(this),
                        error: function () {
                            this.getView().setBusy(false);
                            MessageToast.show("Errore salvataggio");
                            this.getView().getModel("Esercizio3").setProperty("/isBtnEditVisible", true);
                            this.getView().getModel("Esercizio3").setProperty("/isBtnSaveVisible", false);
                            this.getView().getModel("Esercizio3").setProperty("/isBtnCancelVisible", false);
                            this.getView().getModel("Esercizio3").setProperty("/isBtnAddVisible", true);
                            this.bindTable();
                        }.bind(this)

                    });

                } else {

                    this.getView().getModel("Esercizio3").setProperty("/isBtnEditVisible", true);
                    this.getView().getModel("Esercizio3").setProperty("/isBtnSaveVisible", false);
                    this.getView().getModel("Esercizio3").setProperty("/isBtnCancelVisible", false);
                    this.getView().getModel("Esercizio3").setProperty("/isBtnAddVisible", true);
                    this.bindTable();
                    MessageToast.show("Non ci sono cambiamenti");

                }


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
                                    this.getView().getModel("Esercizio3").setProperty("/isBtnEditVisible", true);
                                    this.getView().getModel("Esercizio3").setProperty("/isBtnSaveVisible", false);
                                    this.getView().getModel("Esercizio3").setProperty("/isBtnCancelVisible", false);
                                    this.getView().getModel("Esercizio3").setProperty("/isBtnAddVisible", true);
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
                    this.getView().getModel("Esercizio3").setProperty("/isBtnEditVisible", true);
                    this.getView().getModel("Esercizio3").setProperty("/isBtnSaveVisible", false);
                    this.getView().getModel("Esercizio3").setProperty("/isBtnCancelVisible", false);
                    this.getView().getModel("Esercizio3").setProperty("/isBtnAddVisible", true);
                }




            },
            Create: function (oEvent) {
                var oRetrievedResult = {
                    Name: "",
                    Description: "",
                    ReleaseDate: "",
                    DiscontinuedDate: "",
                    Rating: 0,
                    Price: 0,
                    beginButtonEnable: false,
                    isDeleted: false
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
                            var iContatore = this.getView().getModel("Esercizio3").getProperty("/idTable");
                            var oContainer = this.getView().getModel("Empity").getData();
                            var oTable = this.getView().getModel("Data").getData();

                            delete oContainer.beginButtonEnable;
                            oContainer.idTable = iContatore;
                            oTable.results.unshift(oContainer);
                            iContatore++;

                            this.getView().getModel("Esercizio3").setProperty("/idTable", iContatore);
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
                    oCheck.Rating !== null && oCheck.Price !== null && oCheck.Rating !== undefined && oCheck.Price !== undefined) {
                    this.getView().getModel("Empity").setProperty("/beginButtonEnable", true);
                } else {
                    this.getView().getModel("Empity").setProperty("/beginButtonEnable", false);
                }
            },
            deleteColumn: function (oEvent) {
                var oRecords = oEvent.getParameter("listItem").getBindingContext("Data").getObject()
                var oTable = this.getView().getModel("Data").getData();
                var iIndex = oTable.results.indexOf(oRecords);
                oTable.results[iIndex].isDeleted = true;

                this.getView().getModel("Data").refresh(true);
            },


            onPress: function () {
                var oView = this.getView(),
                    oButton = oView.byId("button");

                if (!this._oMenuFragment) {
                    this._oMenuFragment = Fragment.load({
                        id: oView.getId(),
                        name: "esercitazione.view.Menu",
                        controller: this
                    }).then(function (oMenu) {
                        oMenu.openBy(oButton);
                        this._oMenuFragment = oMenu;
                        return this._oMenuFragment;
                    }.bind(this));
                } else {
                    this._oMenuFragment.openBy(oButton);
                }
            },
            onMenuAction: function (oEvent) {
                var oItem = oEvent.getParameter("item"),
                    sItemPath = "";

                while (oItem instanceof MenuItem) {
                    sItemPath = oItem.getText() + " > " + sItemPath;
                    oItem = oItem.getParent();
                }

                sItemPath = sItemPath.substr(0, sItemPath.lastIndexOf(" > "));
                
                sap.ui.getCore().applyTheme(sItemPath); 
            },
            
            onExcelExport: function () {
                var aLogs = this.getView().getModel("Data").getData();
    
                var oSettings = {
                    workbook: {
                        columns: this._createColumnConfig()
                    },
                    dataSource: aLogs.results,
                    fileName: this._ExportfileName()
                };
    
                var oSheet = new Spreadsheet(oSettings);
                oSheet.build().then(function () {
                    MessageToast.show(this.getResourceBundle().getText("LogsExportCompleted"), {
                        duration: 3000
                    });
                }.bind(this))
                    .finally(oSheet.destroy());
            },
            _createColumnConfig: function () {
    
                return [{
                    label: "Name",
                    property: "Name",
                }, {
                    label: "Description",
                    property: "Description"
                }, {
                    label: "ReleaseDate",
                    property: "ReleaseDate"
                }, {
                    label: "DiscontinuedDate",
                    property: "DiscontinuedDate"
                }, {
                    label: "Rating",
                    property: "Rating"
                }, {
                    label: "Price",
                    property: "Price"
                },]
            },
            _ExportfileName: function () {
                
                Date.prototype.yyyymmdd = function () {
                    var mm = this.getMonth() + 1;
                    var dd = this.getDate();
                    return [(dd > 9 ? "" : "0") + dd, (mm > 9 ? "" : "0") + mm, this.getFullYear()].join("");
                };
    
                var oDate = new Date();
                return "Logs_" + oDate.yyyymmdd() + "_" + oDate.getHours() + oDate.getMinutes() + oDate.getSeconds();
            },
            onCSVExport: function () {
                var aLogs = this.getView().getModel("Data").getData();
    
                var oMessagesModel = new JSONModel(aLogs.results);
    
                var oExport = new Export({
                    exportType: new ExportTypeCSV({
                        fileExtension: "csv",
                        separatorChar: ";"
                    }),
                    models: oMessagesModel,
                    rows: {
                        path: "/"
                    },
                    columns: [{
                        name: "Name",
                        template: {
                            content: "{Name}"
                        }
                    }, {
                        name: "Description",
                        template: {
                            content: "{Description}"
                        }
                    }, {
                        name: "ReleaseDate",
                        template: {
                            content: "{ReleaseDate}"
                        }
                    }, {
                        name: "DiscontinuedDate",
                        template: {
                            content: "{DiscontinuedDate}"
                        }
                    }, {
                        name: "Rating",
                        template: {
                            content: "{Rating}"
                        }
                    }, {
                        name: "Price",
                        template: {
                            content: "{Price}"
                        }
                    }]
                });
    
                oExport.saveFile(this._ExportfileName()).catch(function () {
                    MessageToast.show(this.getResourceBundle().getText("LogsExportError"), {
                        duration: 3000
                    });
                }.bind(this)).then(function () {
                    MessageToast.show(this.getResourceBundle().getText("LogsExportCompleted"), {
                        duration: 3000
                    });
                    oExport.destroy();
                }.bind(this));
            },
            Esporta: function() {
                var oDialog = new Dialog({
                    contentWidth: "40%",
                    title: "Esportare la tabella?",
                    draggable: true,
                    type: "Message",
                    content: [new SimpleForm({
                        editable: true,
                        layout: "ResponsiveGridLayout",
                        labelSpanXL: 2,
                        labelSpanL: 2,
                        labelSpanM: 2,
                        labelSpanS: 12,
                        emptySpanXL: 3,
                        emptySpanL: 2,
                        emptySpanM: 1,
                        emptySpanS: 0,
                        columnsXL: 1,
                        columnsL: 1,
                        columnsM: 1,
                        backgroundDesign: "Solid",
                        content: [new Select({
                            width: "100%",
                            editable: true,
                            selectedKey: "{Esercizio3>/themeSelected}",
                            items: {
                                path: "Esercizio3>/exportType",
                                template: new Item({
                                    key: "{Esercizio3>key}",
                                    text: "{Esercizio3>value}"
                                }),
                                templateShareable: false
                            }
                        })]
                    })],
                    beginButton: new Button({
                        type: "Accept",
                        text: "Esporta",
                        enabled: true,
                        press: function (oEventPress) {
                            if (this.getView().getModel("Esercizio3").getProperty("/themeSelected") === "EXCEL") {
                                this.onExcelExport()
                            } else {
                                this.onCSVExport()
                            }
                            

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
             }
        });


    });