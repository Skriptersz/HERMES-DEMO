# How to Create a Salesforce Connected App (5 minutes)

## Why do you need this?
Your Salesforce org has SOAP API disabled, so we need to use OAuth2 authentication instead. This requires a "Connected App" in Salesforce.

---

## Step-by-Step Instructions

### 1. Go to Setup
- Log into Salesforce at https://login.salesforce.com
- Click the **gear icon** (⚙️) in top right
- Click **Setup**

### 2. Create the Connected App
1. In the Quick Find box (left sidebar), type **"App Manager"**
2. Click **App Manager**
3. Click **New Connected App** (top right)

### 3. Fill in Basic Information
- **Connected App Name**: `REM Dubai API`
- **API Name**: `REM_Dubai_API` (auto-fills)
- **Contact Email**: Your email address

### 4. Enable OAuth Settings
1. Check the box: **☑ Enable OAuth Settings**
2. **Callback URL**: Enter `https://login.salesforce.com/services/oauth2/callback`
   - (This won't be used, but it's required)
3. **Selected OAuth Scopes**: Add these scopes by selecting them and clicking the arrow to move them to "Selected":
   - **Full access (full)**
   - **Perform requests at any time (refresh_token, offline_access)**

4. Scroll down and check:
   - **☑ Enable Client Credentials Flow** (if available)

5. Click **Save** at the bottom
6. Click **Continue** on the warning popup

### 5. Get Your Consumer Key and Secret

After saving, you'll see the app details page.

1. Click **Manage Consumer Details** button
2. **Verify your identity** (Salesforce will send a code to your email)
3. Enter the verification code
4. You'll now see:
   - **Consumer Key** (this is your CLIENT_ID)
   - **Consumer Secret** (this is your CLIENT_SECRET)

**COPY BOTH OF THESE** - you'll need them in the next step!

---

## 6. Update Your .env File

Open your `.env` file and add these two new lines:

```
SF_CLIENT_ID=your_consumer_key_here
SF_CLIENT_SECRET=your_consumer_secret_here
```

Your complete `.env` should look like this:

```
SF_LOGIN_URL=https://login.salesforce.com
SF_USERNAME=polarshop1312-6jnn@force.com
SF_PASSWORD=Nicolai2608!?
SF_SECURITY_TOKEN=DBtfD0jjl5iwiq50Utmtk7wPo
SF_CLIENT_ID=paste_consumer_key_here
SF_CLIENT_SECRET=paste_consumer_secret_here
```

---

## 7. Restart Your Server

1. Stop your Netlify dev server (Ctrl+C)
2. Start it again: `netlify dev`
3. Try submitting the form!

---

## Troubleshooting

### "OAuth client credentials are invalid"
- Double-check you copied the Consumer Key and Secret correctly
- Make sure there are no extra spaces

### "User authentication failed"
- Verify your username, password, and security token are correct

### Still not working?
- Wait 2-5 minutes after creating the Connected App (Salesforce needs time to propagate the changes)
- Try logging out and back into Salesforce
- Clear your browser cache

---

## Quick Reference

**Where to find your credentials:**
- Setup → App Manager → Your App → View (or click the dropdown → View)
- Click **Manage Consumer Details**

**Need to regenerate secrets:**
- Go back to the same location and click the regenerate button
