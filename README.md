# Quick Start

1. Fork this repo

### Google Sheet Setup

2. Create a copy of [this google sheet](https://docs.google.com/spreadsheets/d/1y2t5XG_PkP_vOl66ghIpP1yk6WuhaZ0u8bPeNA-vo8E)

3. Copy the spreadsheet ID from the URL (i.e. `docs.google.com/spreadsheets/d/----THIS-VALUE-HERE----/`)

4. In the sheet, select `App Script` from the `Extension` menu

5. Change line 31 and line 106 to reference the current spreadsheet
    - Before:  `var doc = SpreadsheetApp.openById("1y2t5XG_PkP_vOl66ghIpP1yk6WuhaZ0u8bPeNA-vo8E")`
    - After: `var doc = SpreadsheetApp.openById("---YOUR-ID-FROM-STEP-2---")`

6. Click "Run" in the menu bar
    - When prompted for authorization, click `Review Permissions`
    - A Google Auth prompt will appear. Click your username
    - Google will display a warning: "Google hasn't verified this app". Click `Advanced` at the bottom of the prompt then `Go to Recieve Post Data (Unsafe)`
    - Click "Allow" to allow the app to change the spreadsheet on your behalf

7. Click "Deploy" in the top right corner
    - Enter a description
    - Execute as "Me"
    - "Anyone" has access

8. Get the script ID
    - Select `Project Settings` (gear icon) from the left menu
    - Copy the Script ID
  
### Github Repo Setup

9. Change the [login.js](./login.js) and [index.js](./index.js) repo files
    - Open each of the files above
    - Replace the [current script ID](https://github.com/prphntm63/CIA-taplist/blob/2425d2dfd8b0cfabb73147f6c25d0d810064e3c6/index.js#L3) with your script ID (format: `"https://script.google.com/macros/s/----YOUR-SCRIPT-ID-HERE----/exec"`)
    - Commit the changes

10. Deploy to Github Pages
    - Select `Settings` in the github repo
    - Click `Pages` on the left menu
    - Deploy from "master" branch
    - Your site should be live at `https://YOUR_GITHUB_USERNAME.github.io/CIA-taplist/`

11. Update the links and QR codes
    - Use a QR code generator to generate a QR code link to the Google Form that was created when you copied the sheet
    - Replace `addOnDeckBeer.png` image with your updated QR code
    - Use a QR code generator to generate a QR code link to the "login" page (i.e. `https://YOUR_GITHUB_USERNAME.github.io/CIA-taplist/login`)
    - Replace `login.png` image with your updated QR code
    - Commit your changes

12. Update the club images
    - Change [this img](https://github.com/prphntm63/CIA-taplist/blob/2425d2dfd8b0cfabb73147f6c25d0d810064e3c6/index.html#L17) `src` property to update the club logo at the top of the page
    - You can also change [the AHA logo](https://github.com/prphntm63/CIA-taplist/blob/2425d2dfd8b0cfabb73147f6c25d0d810064e3c6/index.html#LL22C23-L22C23) if you desire
    - Commit your changes
