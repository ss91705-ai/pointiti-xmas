// Google 試算表 → 擴充功能 → Apps Script，貼上後「部署 → 新增部署作業 → 網頁應用程式」
// 執行身分：我；存取權：所有人。部署後把網址貼到 index.html 的 CONFIG.SHEET_URL。
const HEADERS = ['time','house','set','price','shipping','total','item1','item2','item3','item4','name','phone','address','ig','last5','note','page'];
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(['下單時間','小屋','禮盒','禮盒價','運費','應付金額','內容1','內容2','內容3','內容4','姓名','手機','地址','IG','後五碼','備註','頁面']);
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow(HEADERS.map(k => k === 'phone' || k === 'last5' ? "'" + d[k] : (d[k] ?? '')));
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
