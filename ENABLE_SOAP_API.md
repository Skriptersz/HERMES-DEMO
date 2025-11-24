# How to Enable SOAP API in Salesforce

Your Salesforce org has SOAP API disabled. To make the Contact integration work, you need to enable it.

## Option 1: Enable SOAP API (Requires Admin)

1. Go to Salesforce Setup
2. Quick Find → type **"API"**
3. Click **"API"** under Settings
4. Look for **"Enable SOAP API"** or **"SOAP API Enabled"**
5. If there's a checkbox, check it and Save

**Note:** If you don't see this option or can't enable it, you may need to:
- Contact your Salesforce administrator
- Or use a Developer Edition org (which usually has this enabled by default)

## Option 2: Check Your User Permissions

1. Setup → Quick Find → "Users"
2. Click on your username
3. Click your Profile name
4. Check if **"API Enabled"** is checked
5. If not, contact your admin to enable it

## Option 3: Ask Admin to Create Connected App

If you can't enable SOAP API yourself, ask your Salesforce administrator to:
1. Create a Connected App in Salesforce
2. Enable OAuth with username-password flow
3. Give you the Consumer Key and Consumer Secret

See `CONNECTED_APP_SETUP.md` for detailed instructions to share with your admin.

## Option 4: Use Web-to-Lead Instead (Works Now)

If none of the above work, we can switch back to Web-to-Lead, which:
- ✅ Works immediately (no special permissions)
- ✅ Creates **Leads** in Salesforce
- ⚠️ Creates Leads instead of Contacts (you can convert Leads to Contacts manually)

Let me know which option you want to try!
