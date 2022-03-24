## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Fri Mar 11 2022 15:01:59 GMT+0100 (Ora standard dell’Europa centrale)|
|**App Generator**<br>@sap/generator-fiori-freestyle|
|**App Generator Version**<br>1.5.1|
|**Generation Platform**<br>Visual Studio Code|
|**Floorplan Used**<br>simple|
|**Service Type**<br>OData Url|
|**Service URL**<br>https://services.odata.org/V2/OData/OData.svc/
|**Module Name**<br>esercitazione|
|**Application Title**<br>Esercitazione|
|**Namespace**<br>|
|**UI5 Theme**<br>sap_fiori_3|
|**UI5 Version**<br>1.99.0|
|**Enable Code Assist Libraries**<br>False|
|**Add Eslint configuration**<br>False|
|**Enable Telemetry**<br>True|


### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  In order to launch the generated app, simply run the following from the generated app root folder:

```
    npm install
    npm start
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)

## Esercitazione

A Fiori application.

ESERCIZIO 1:

STEP 1:
Al click di un pulsante verranno caricati tutti i record del servizio odata "OdataPublic" entità Products, all'interno di una tabella.
Nella tabella mostrare tutte le colonne dell'entità.
https://services.odata.org/V2/(S(c3ctfpad1wtz3lwcjwfj5zmi))/OData/OData.svc/

STEP 2:
Prevedere una colonna aggiuntiva con un pulsante "cancella", al click del pulsante il record deve essere rimosso dal modello. Chiedere conferma prima della cancellazione (sap.m.MessageBox)

STEP 3:
Al click di un record nella tabella navigare in una nuova videata di dettaglio.
Quando si accede alla videata deve essere ripetuta la chiamata OData in modo che possano essere prese anche le informazioni delle Category e Supplier)
Nella videata dovranno essere mostrati tutti i campi dell'entità in un sap.ui.layout.form.SimpleForm.
Prevedere un pulsante per tornare alla videata con la lista dei Products.

STEP 4:
Al click di un pulsante denominato "crea" aprire un sap.m.Dialog e chiedere all'utente di inserire tutti i campi dell'entità. Tutti i campi sono obbligatori.
Se tutti i dati sono stati inseriti il pulsante "salva" della popup si attiverà e il record verrà inserito in tabella.
Mostra un messaggio di conferma "Product creato" tramite un sap.m.MessageToast con una durata di 4 secondi.

https://blogs.sap.com/2017/03/13/how-to-consume-an-odata-service-with-openui5-sapui5/


STEP 5:
Nella lista prodotti colorare:
	• Rosso i record con Price >= 40
	• Arancione i record con Price 20 >= x < 40
	• Verde i record con Price < 20

Usare sap.m.ObjectNumber

STEP 6:
Inserire una casella di ricerca che permetta di filtrare gli inserimenti presenti all'interno della tabella.
Durante la digitazione dovranno essere mostrati solo i record che contengono in un campo qualsiasi il valore inserito dall'utente.

------------------------------------------------------------------------------------------

ESERCIZIO 2:


STEP 1 :

Vedi Esercizio 1

Le celle della tabella devono essere sap.m.Text.

Gli inserimenti devono essere raggruppati per categoria.

 

STEP 2:

Alla pressione di un pulsante denominato "Modifica" la tabella deve "trasformarsi", le celle della tabella devono diventare sap.m.Input così da permettere la modifica.

Il pulsante "Modifica" viene nascosto e appaio 2 pulsanti: "salva" e "annulla".

 

Al salvataggio le modifiche effettuate dall'utente diventano definitive, la tabella torna allo stato iniziale (sap.m.Text) ma i valori sono quelli modificati dall'utente.

sap.m.MessageToast che conferma il salvataggio

 

Nel caso di click su annulla la tabella torna allo stato iniziale (sap.m.Text) e i valori originali vengono ripristinati.

sap.m.MessageBox che chiede conferma dell'azione SOLO se ci sono effettivamente modifiche.

 

Se si entra in modifica ma non vengono rilevate modifiche segnalarlo al click di "salva" e "annulla".

------------------------------------------------------------------------------------------

ESERCIZIO 3

 

STEP 1:

Comprendere tutte le funzionalità presenti nell'esercizio 2, ma i dati dovranno essere salvati sul sistema di backend.

Effettuare chiamate di tipo PUT e POST.

 

STEP 3:

Implementare la possibilità di aggiungere record alla tabella tramite apposito pulsante. Il salvataggio andrà fatto sul sistema di backend.

(Vedi step 4 Esercizio 1)

Le modifiche saranno inviate al backend solo alla pressione del pulsante SALVA.

 

STEP 4:

Implementare la possibilità di eliminare record alla tabella tramite apposito pulsante. Il salvataggio andrà fatto sul sistema di backend.

(Vedi step 2 Esercizio 1)

Le modifiche saranno inviate al backend solo alla pressione del pulsante SALVA.
 

STEP 5:

Inserire un pulsante denominato "Tema" che una volta premuto permetta di selezionare un tema standard SAP.

Quando si cambia il tema nella tendina (sap.m.Select) deve essere modificato il tema dell'applicazione LIVE!!!

Se si preme CONFERMA

Il tema rimane quello selezionato

Altrimenti

Torna il tema originario

 

(Vedi Wispin, cerca sap.ui.getCore().applyTheme(sThemeSaved) )

 

STEP 6:

Prevedere un pulsante di tipo sap.m.MenuButton che permetta di esportare la tabella in Excel o CSV.

(Cerca su Google oppure su Wispin vedi onExcelExport e onCSVExport in Messages.controller.js )

------------------------------------------------------------------------------------------

ESERCIZIO 4:

 

STEP 1:

Prevedere una videata con 2 liste affiancate. Inserire X Record nella Lista 1 a proprio piacimento.

La Lista 2 deve essere vuota.

 

STEP 2:

Abilitare il Drag&Drop su entrambe le liste, deve essere possibile spostare i record dalla Lista 1 alla Lista 2 e viceversa.

 

STEP 3:

Abilitare il Drag&Drop anche da Lista 1 a Lista 1 e da Lista 2 a Lista 2.

Inserire pulsante "Edit", "Save" e "Cancel" con le stesse logiche dell'ESERCIZIO 2.

In questo caso non sarà possibile modificare i campi nella lista ma è possibile solo il Drag&Drop.

 

STEP4:

Utilizzare un sap.m.SegmentedButton, con valori "Copy" e "Move", in base al bottone selezionato il Drag&Drop eseguirà una copia dell'elemento o uno spostamento. Di default è attivato il "Move".

------------------------------------------------------------------------------------------

ESERCIZIO 5:

 

STEP 1:

Creare una videata con 2 sap.m.Input, il campo A è editabile dall'utente, il campo B no.

Quando un utente effettua modifiche al campo A devono essere automaticamente riportate al campo B ad ogni carattere digitato.

No Javascript…!

------------------------------------------------------------------------------------------

Fiori - Esercizio 6

venerdì 18 marzo 2022

08:48

ESERCIZIO 6:

 

STEP 1:

Creare un pagina con N pulsanti e nella parte sottostante un sap.ui.codeeditor.CodeEditor.

Alla pressione del pulsante X, effettuare le seguente chiamata OData e visualizzare la risposta in formato JSON nel sap.ui.codeeditor.CodeEditor.

Il JSON deve essere formattato e leggibile semplicemente.

 

Ogni STEP corrisponde ad un pulsante

 

STEP 2:

Estrarre il record dell'entità Products con ID uguale a 4.

 

STEP 3:

Estrarre i  3 record dell'entità Products con i prezzi più alti.

 

STEP 4:

Estrarre tutti i record dell'entità Products in ordine decrescente di prezzo.

 

STEP 5:

Estrarre tutti i record dell'entità Products con il prezzo maggiore di 30.

 

STEP 6:

Estrarre tutti i record dell'entità Products che contengono nella descrizione il numero 3.

 

STEP 7:

Estrarre tutti i record dell'entità Products con ID compreso tra 2 e 6, e con prezzo maggiore di 20.

 

STEP 8:

Estrarre solamente i campi: ID, Name e Price dell'entità Products con ID compreso tra 2 e 6, e con prezzo maggiore di 20.


 

STEP 9:

Estrarre tutti i record dell'entità Products con Category Name uguale "Electronics" e in ordine decrescente di ID.

 

STEP 10:

Estrarre il 5 record dell'entità Products per Prezzo.

 

STEP 11:

Estrarre tutti i record dell'entità Products con Supplier Name contenente "Exotic" e in ordine decrescente di Prezzo.

 

STEP 12:

Estrarre il conteggio dell'entità Products con Supplier Name contenente "Exotic".

 

STEP 13:

Estrarre tutti i record dell'entità Products con ID compreso tra 2 e 6, oppure con prezzo maggiore di 30.

 

STEP 14:

Estrarre tutti i record dell'entità Products che contengono nella descrizione il numero 3 e il loro conteggio.

 

STEP 15:

Estrarre la navigation Category dell'entità Products con ID uguale a 4.

STEP 16:

Estrarre tutti i record dell' entità Products e il loro contegio.

------------------------------------------------------------------------------------------

Fiori - Esercizio 7

venerdì 18 marzo 2022

12:48

ESERCIZIO 7:

 

STEP 1:

Riprendere l'Esercizio 3 e gestire correttamente le date, per l'inserimento di nuove righe e nel salvataggio.

Verificare e gestire eventuali messaggi di ritorno dalla submitChanges (scatta il success anche in caso di error).

Verificare e gestire i numeri correttamente!