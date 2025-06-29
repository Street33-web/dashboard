function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tarifs");
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues();
  const result = data.map(row => ({
    nom: row[0],
    categorie: row[1],
    prix: row[2],
    stock: row[3]
  }));
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
