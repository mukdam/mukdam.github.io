# LinkedIn Job Openings Extractor & Sheet Updater Task

This document defines the automated workflow for searching LinkedIn posts, extracting job openings with contact emails/application links, and appending them directly into the Google Spreadsheet.

---

## 1. Objective
Whenever the user provides a list of search keywords (e.g. `Adobe Commerce`, `Magento`, `App Builder`, `Adobe Hiring`), run the extraction pipeline and update the specified Google Sheet tab (`New Opening`).

---

## 2. Target Sources & Destination

- **Target Google Spreadsheet**:
  - **Live Sheet Link**: [Interview - New Opening Tab (gid: 1462277258)](https://docs.google.com/spreadsheets/d/1JyFm7UwYiFGrlloK0n_QIJTz_Mz0XGstkyBr3CiZa2Q/edit?gid=1462277258#gid=1462277258)
  - **Direct URL**: `https://docs.google.com/spreadsheets/d/1JyFm7UwYiFGrlloK0n_QIJTz_Mz0XGstkyBr3CiZa2Q/edit?gid=1462277258#gid=1462277258`
  - **Target Tab**: `New Opening` (gid: `1462277258`)

- **LinkedIn Feed Search URL Template**:
  ```
  https://www.linkedin.com/search/results/content/?keywords={KEYWORD}&origin=FACETED_SEARCH&sortBy=%5B%22date_posted%22%5D&datePosted=%5B%22past-week%22%5D
  ```

---

## 3. Automation Steps

### Step 1: Connect to Browser via Chrome DevTools Protocol (CDP)
- Remote Debugging Port: `http://[::1]:9222` (IPv6 localhost).
- Identify or create a page for LinkedIn search navigation.

### Step 2: Query Execution & Deep Feed Scraping
For each keyword provided:
1. Navigate to the LinkedIn Content Search URL with `sortBy=date_posted` and `datePosted=past-week`.
2. Wait 3–4 seconds for dynamic content to hydrate.
3. Scroll the feed container (`main` element / `window`) continuously (10–15 times, 1.5s delay).
4. Automatically click all "see more" / "… more" buttons in post bodies to expand full job descriptions.
5. Extract the full post texts, external URLs, and email addresses.

### Step 3: Job Opening Filtering & Data Extraction
From all collected post blocks:
- **Filter**: Keep only posts advertising job openings (matching hiring keywords like `hiring`, `opening`, `vacancy`, `looking for`, `join our team`, while excluding "open to work / candidate looking for a job" posts).
- **Extract Fields**:
  - `Company Name` (and Recruiter Name if available)
  - `Job Title` / Role
  - `Experience`
  - `Location / Mode` (Remote / Hybrid / Onsite / City)
  - `Email` (e.g., recruiter or HR email)
  - `Application Link` (Google Forms, external portal, or LinkedIn apply link)
  - `Key Requirements / Tech Stack`
  - `Source / Date` (e.g. `LinkedIn (Past week)`)

### Step 4: Update Google Spreadsheet
1. Open or switch to the Google Sheet tab `New Opening` (`gid=1462277258`).
2. Read the existing rows to avoid adding duplicate entries.
3. Find the next empty row.
4. Format the new rows as Tab-Separated Values (TSV) or append them cleanly into the sheet.
5. Verify the update via sheet CSV export.
6. Present a formatted summary of the new entries to the user.

---

## 4. Usage Instructions
To trigger this task in any future turn, the user only needs to provide:
```text
Run task: [Keyword 1], [Keyword 2], ...
```
Example:
```text
Run task: Magento 2, Adobe Commerce Cloud, Commerce Architect
```
The agent will automatically execute the end-to-end extraction and update the sheet.
