# Why You Don't See Leads in Salesforce

## Quick Checks:

### 1. Check if Web-to-Lead is Actually Enabled
- Setup → Quick Find → "Web-to-Lead"
- Make sure it says **"Web-to-Lead: Enabled"**
- If not, click Edit and enable it

### 2. Check Different Lead Views
In the Leads tab, change the view dropdown:
- Try **"All Open Leads"**
- Try **"Recently Created Leads"**
- Try **"All Leads"**
- Try **"Unread Leads"**

### 3. Search for the Lead
- In the top search bar, search for: **Nicolai Tranberg**
- Or search: **nibekk2@gmail.com**

### 4. Check Debug Email
- Check the email inbox: **nibekk2@gmail.com**
- Salesforce should have sent a debug email with success/failure info
- Look for subject like "Web-to-Lead Debug"

### 5. Check Lead Assignment Rules
- Setup → Quick Find → "Lead Assignment Rules"
- If there are active rules, the lead might be assigned to someone else
- Check if you have permission to see all leads

### 6. Check Validation Rules
- Setup → Object Manager → Lead → Validation Rules
- If any are active, they might be blocking the lead
- Company field is often required and we're setting it to "REM Dubai Lead"

### 7. Check Duplicate Rules
- Setup → Quick Find → "Duplicate Rules"
- Duplicate rules might be preventing creation if a similar lead exists

## Most Common Issue: Web-to-Lead Not Enabled

Did you actually enable Web-to-Lead? Let me know and we can try a different approach.
