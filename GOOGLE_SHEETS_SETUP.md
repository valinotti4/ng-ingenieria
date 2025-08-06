# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration to automatically log all quotation requests.

## 📋 What gets logged:
- Timestamp (Argentina timezone)
- Customer Name
- Phone Number
- Email
- Project Description
- Status (always "Nuevo" initially)

## 🔧 Setup Steps:

### 1. Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Cotizaciones NG Ingeniería" (or any name you prefer)
4. Create a sheet called "Cotizaciones" with these headers in row 1:
   - A1: `Fecha`
   - B1: `Nombre`
   - C1: `Teléfono`
   - D1: `Email`
   - E1: `Proyecto`
   - F1: `Estado`
5. Copy the spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

### 2. Create Google Cloud Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### 3. Create Service Account Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Name: `ng-ingenieria-sheets`
   - Description: `Service account for NG Ingeniería contact form`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### 4. Generate Private Key
1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Select "JSON" format
5. Download the JSON file

### 5. Share Spreadsheet with Service Account
1. Open your Google Spreadsheet
2. Click "Share" button
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it "Editor" permissions
5. Uncheck "Notify people" and click "Share"

### 6. Configure Environment Variables
From the downloaded JSON file, extract these values and add to `.env.local`:

```env
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_SHEETS_ID=your-spreadsheet-id-from-step-1
```

**Important Notes:**
- The private key should include the full key with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Replace `\n` with actual newlines in the private key
- The spreadsheet ID is the long string in the Google Sheets URL

## 🧪 Testing
After setup, submit a test form. You should see:
1. Two emails sent (to owner and customer)
2. A new row added to your Google Spreadsheet
3. Console logs confirming the integration worked

## 🚨 Troubleshooting
- **Permission denied**: Make sure you shared the spreadsheet with the service account email
- **Invalid credentials**: Check that private key and client email are correct
- **Sheet not found**: Verify the spreadsheet ID and sheet name ("Cotizaciones")
- **API not enabled**: Ensure Google Sheets API is enabled in your project

The integration is designed to fail gracefully - if Google Sheets setup is incomplete, emails will still be sent successfully.