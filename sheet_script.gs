/* 
This is the google script that is required to use a Google Sheet as a "database" for the tap list.

Deploying the sheet:
1. Create a new google sheet (you can also use a google form!)
2. From the menu, select "Extensions -> App Scripts"
3. Create a new file called "sheet_script.gs" and paste the contents of this file into the editor
3. Run > setup
4. Publish > Deploy as web app 
  - enter Project Version name and click 'Save New Version' 
  - set security level and enable service (most likely execute as 'me' and access 'anyone, even anonymously') 
5. Copy the 'Current web app URL' and set it as the string variable at the top of index.js and login.js 
*/

var SHEET_NAME = "Sheet1";
 
var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service
 
// If you don't want to expose either GET or POST methods you can comment out the appropriate function
function doGet(e){
  return handleResponse(e);
}
 
function doPost(e){
  return handleResponse(e);
}

function getTaps(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);
  try {
    // next set where we write the data - you could write to multiple/alternate destinations
    var doc = SpreadsheetApp.openById("1y2t5XG_PkP_vOl66ghIpP1yk6WuhaZ0u8bPeNA-vo8E");
    var sheet = doc.getSheetByName(SHEET_NAME);
    var tapData = sheet.getRange("B1:I9").getValues();
    var lastRow = doc.getSheetByName("Form Responses 1").getLastRow()
    var formData = doc.getSheetByName("Form Responses 1").getRange("A1:I"+lastRow).getValues();
    
    return ContentService
    .createTextOutput(JSON.stringify({"result":"success", "tapData" : tapData, "formData": formData}))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(e){
    // if error return this
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
}
 
function handleResponse(e) {
  // shortly after my original solution Google announced the LockService[1]
  // this prevents concurrent access overwritting data
  // [1] http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
  // we want a public lock, one that locks for all invocations
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.
   
  // If you are passing JSON in the body of the request uncomment this block
//  var jsonString = e.postData.getDataAsString();
//  e.parameter = JSON.parse(jsonString);
 
  try {
    // next set where we write the data - you could write to multiple/alternate destinations
    var doc = SpreadsheetApp.openById("1y2t5XG_PkP_vOl66ghIpP1yk6WuhaZ0u8bPeNA-vo8E");
    var sheet = doc.getSheetByName(SHEET_NAME);
     
    if (e.parameter.tap1) {
      var values = [
        [e.parameter.tap1],
        [e.parameter.tap2],
        [e.parameter.tap3],
        [e.parameter.tap4],
        [e.parameter.tap5],
        [e.parameter.tap6],
        [e.parameter.tap7],
        [e.parameter.tap8]
      ];
      
      sheet.getRange("B2:B9").setValues(values)
    }
    
    
    // return json success results
    var doc = SpreadsheetApp.openById("1y2t5XG_PkP_vOl66ghIpP1yk6WuhaZ0u8bPeNA-vo8E");
    var sheet = doc.getSheetByName(SHEET_NAME);
    var tapData = sheet.getRange("B1:I9").getValues();
    var lastRow = doc.getSheetByName("Form Responses 1").getLastRow()
    var formData = doc.getSheetByName("Form Responses 1").getRange("A1:I"+lastRow).getValues();
    
    return ContentService
    .createTextOutput(JSON.stringify({"result":"success", "tapData" : tapData, "formData": formData}))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(e){
    // if error return this
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
}
 
function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}
