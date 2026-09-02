/**
 * KOPI BOY RESEARCH — SURVEY BACKEND
 * ------------------------------------------------------------
 * Receives POST submissions from rider-survey.html and
 * merchant-survey.html, and archives each response as a new row
 * in a Google Sheet — one tab per survey type ("Riders" and
 * "Merchants"), created automatically the first time each type
 * is submitted.
 *
 * SETUP:
 * 1. Go to sheets.google.com, create a new blank spreadsheet.
 *    Name it anything, e.g. "Kopi Boy Survey Responses".
 * 2. In that sheet, go to Extensions > Apps Script.
 * 3. Delete any starter code in the editor, paste this whole
 *    file in its place.
 * 4. Click Deploy > New deployment.
 *    - Click the gear icon next to "Select type" > Web app.
 *    - Description: anything, e.g. "Survey receiver".
 *    - Execute as: Me.
 *    - Who has access: Anyone.
 *    Click Deploy. Authorize the permissions Google asks for
 *    (click through "Advanced" > "Go to project (unsafe)" if it
 *    warns you — this is your own script, it's safe).
 * 5. Copy the "Web app URL" it gives you at the end.
 * 6. Paste that URL into BOTH rider-survey.html and
 *    merchant-survey.html, replacing PASTE_YOUR_APPS_SCRIPT_URL_HERE.
 * 7. Re-upload/redeploy the HTML files wherever you're hosting them.
 *
 * Every time you edit this script later, you must create a NEW
 * deployment (Deploy > Manage deployments > pencil icon > New
 * version) for the changes to actually go live.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const surveyType = data.surveyType === "rider" ? "Riders" : "Merchants";

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(surveyType);

    if (!sheet) {
      sheet = ss.insertSheet(surveyType);
      const headers = surveyType === "Riders"
        ? ["Timestamp", "Q1 Currently do gig work", "Q2 Platforms used", "Q3 Hours per week",
           "Q4 Prefer immediate payment", "Q5 Comfortable paid by merchant directly",
           "Q6 Prefer choosing own jobs", "Q7 Tier system feels unfair",
           "Q8 Interested in casual no-schedule work", "Q9 Fair fee matters more than tier",
           "Q10 Biggest frustration (open text)"]
        : ["Timestamp", "Q1 Currently sell food", "Q2 Used delivery platform before",
           "Q3 Commission eats into profit", "Q4 Prefer flat subscription over commission",
           "Q5 $20-25/month feels fair", "Q6 Comfortable choosing own delivery helper",
           "Q7 Own refund policy gives more confidence", "Q8 Reach is harder than commission cost",
           "Q9 What would help sell more (open text)"];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    }

    const row = surveyType === "Riders"
      ? [new Date(), data.q1 || "", data.q2 || "", data.q3 || "", data.q4 || "",
         data.q5 || "", data.q6 || "", data.q7 || "", data.q8 || "", data.q9 || "", data.q10 || ""]
      : [new Date(), data.q1 || "", data.q2 || "", data.q3 || "", data.q4 || "",
         data.q5 || "", data.q6 || "", data.q7 || "", data.q8 || "", data.q9 || ""];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
