# Salesforce Setup Guide - Step by Step

## Part 1: Create Custom Fields on Lead Object

### Step 1: Create Property_Interest__c Field

1. Log into Salesforce at https://login.salesforce.com
2. Click the **gear icon** (⚙️) in the top right corner
3. Click **Setup**
4. In the left sidebar, search for "Object Manager"
5. Click **Object Manager**
6. Find and click **Lead** in the list
7. Click **Fields & Relationships** in the left menu
8. Click **New** button (top right)
9. Select **Text** as the field type → Click **Next**
10. Fill in the details:
    - **Field Label**: `Property Interest`
    - **Length**: `255`
    - **Field Name**: `Property_Interest` (Salesforce will auto-generate this)
11. Click **Next**
12. **Field-Level Security**: Check "Visible" for all profiles → Click **Next**
13. **Page Layouts**: Check all layouts → Click **Save**

### Step 2: Create Budget__c Field

1. Still in **Lead → Fields & Relationships**
2. Click **New** button again
3. Select **Picklist** as the field type → Click **Next**
4. Fill in the details:
    - **Field Label**: `Budget`
    - **Field Name**: `Budget` (auto-generated)
5. In the **Values** section, enter these values (one per line):
   ```
   1-2M
   2-5M
   5-10M
   10M+
   ```
6. Check **"Use first value as default value"** (optional)
7. Click **Next**
8. **Field-Level Security**: Check "Visible" for all profiles → Click **Next**
9. **Page Layouts**: Check all layouts → Click **Save**

---

## Part 2: Get Your Salesforce Security Token

### Step 1: Reset Security Token

1. Still in Salesforce Setup
2. In the top search bar (Quick Find), type **"Reset Security Token"**
3. Click **Reset My Security Token** under Personal Setup
4. Click **Reset Security Token** button
5. **Check your email** - Salesforce will send the security token to your registered email
6. **Copy the token** from the email and save it securely

> **Important**: Your security token changes if you reset your password!

---

## Part 3: Verify API Access is Enabled

### Step 1: Check Your User Permissions

1. In Setup, search for **"Users"** in Quick Find
2. Click **Users** under Administration
3. Find your username and click on it
4. Scroll down to **"Permission Set Assignments"** or **"Profile"**
5. Click on your **Profile** name
6. Click **System Permissions** (or Edit if needed)
7. Verify these permissions are checked:
   - ✅ **API Enabled**
   - ✅ **Modify All Data** (or at minimum "Create" and "Edit" on Leads)

> If you don't have these permissions, contact your Salesforce admin.

---

## Part 4: Gather Your Credentials

You need these 4 values for your `.env` file:

### 1. SF_LOGIN_URL
- **Production/Developer Org**: `https://login.salesforce.com`
- **Sandbox**: `https://test.salesforce.com`

### 2. SF_USERNAME
- This is your Salesforce login email
- Example: `john.smith@remdubai.com`

### 3. SF_PASSWORD
- Your Salesforce account password
- Example: `MyP@ssw0rd123`

### 4. SF_SECURITY_TOKEN
- The token you received via email in Part 2
- Example: `aBcD3FgH1jKlMnOpQrStUvWxYz`

---

## Part 5: Test in Salesforce (Optional but Recommended)

### Create a Test Lead Manually

1. From Salesforce home, click **App Launcher** (9 dots, top left)
2. Click **Sales** app
3. Click **Leads** tab
4. Click **New** button
5. Fill in:
   - First Name: `Test`
   - Last Name: `Lead`
   - Company: `REM Dubai Lead`
   - Email: `test@example.com`
   - Property Interest: Select a value
   - Budget: Select a value
6. Click **Save**

If this works, your custom fields are set up correctly!

---

## Part 6: Configure Your Local Environment

1. In your project directory, copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your values:
   ```
   SF_LOGIN_URL=https://login.salesforce.com
   SF_USERNAME=your_email@example.com
   SF_PASSWORD=your_actual_password
   SF_SECURITY_TOKEN=your_token_from_email
   ```

3. **Save the file**

---

## Part 7: Deploy to Netlify

### Step 1: Add Environment Variables in Netlify

1. Log into https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Build & deploy** → **Environment variables**
4. Click **Add a variable** and add each one:
   - Key: `SF_LOGIN_URL` → Value: `https://login.salesforce.com`
   - Key: `SF_USERNAME` → Value: your Salesforce email
   - Key: `SF_PASSWORD` → Value: your Salesforce password
   - Key: `SF_SECURITY_TOKEN` → Value: your security token
5. Click **Save**
6. **Redeploy your site** for changes to take effect

---

## Troubleshooting

### "INVALID_LOGIN: Invalid username, password, security token"
- Double-check username and password
- Make sure you appended the security token correctly
- Try resetting your security token again

### "UNKNOWN_EXCEPTION: An unexpected error occurred"
- Verify API Enabled permission is checked
- Check that custom fields `Property_Interest__c` and `Budget__c` exist

### "FIELD_CUSTOM_VALIDATION_EXCEPTION"
- Your Salesforce org may have validation rules on Lead object
- Check validation rules in Setup → Object Manager → Lead → Validation Rules
- Temporarily deactivate or adjust rules for website leads

### Field Not Showing in Salesforce
- Verify field-level security is set to "Visible" for your profile
- Check page layouts include the custom fields

---

## Quick Reference

**Custom Fields Created:**
- `Property_Interest__c` (Text, 255)
- `Budget__c` (Picklist: 1-2M, 2-5M, 5-10M, 10M+)

**API Endpoint:**
- Local: `http://localhost:8888/.netlify/functions/salesforce`
- Production: `https://yoursite.netlify.app/.netlify/functions/salesforce`

**Salesforce Object:** Lead

**Required Fields for Lead Creation:**
- FirstName ✅
- LastName ✅
- Company ✅ (auto-set to "REM Dubai Lead")
- Email ✅
