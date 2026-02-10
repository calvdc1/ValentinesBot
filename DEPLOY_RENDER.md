# How to Deploy to Render

Render is a cloud platform where you can host this bot for free (or paid if you want it running 24/7 without interruption).

## 1. Prepare Your Code
1.  **Push your code to GitHub**: You need a GitHub repository for this project.
    - Create a new repo on GitHub.
    - Run these commands in your project folder (if you haven't already):
      ```bash
      git init
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
      git push -u origin main
      ```

## 2. Create a Web Service on Render
1.  Go to [dashboard.render.com](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Configure the Service**:
    - **Name**: `blind-dating-bot` (or whatever you like).
    - **Runtime**: `Node`.
    - **Build Command**: `npm install` (default is usually correct).
    - **Start Command**: `node index.js` (default is usually correct).
    - **Plan**: Select **Free**.

## 3. Environment Variables (IMPORTANT)
You must tell Render your bot secrets. It cannot read your `.env` file.
1.  Scroll down to the **Environment Variables** section.
2.  Add the following keys and values (copy them from your local `.env` file):
    - `DISCORD_TOKEN`: `Your_Actual_Bot_Token`
    - `CLIENT_ID`: `Your_Actual_Client_ID`

## 4. Deploy
1.  Click **Create Web Service**.
2.  Render will start building your bot.
3.  Wait for the logs to say `Web server listening on port...` and `Ready! Logged in as...`.

## 5. Keep it Alive (Free Tier Only)
Render's free tier "spins down" (sleeps) after 15 minutes of inactivity. To keep your bot awake:
1.  Copy the URL Render gives you (e.g., `https://blind-dating-bot.onrender.com`).
2.  Use a free uptime monitor service like [UptimeRobot](https://uptimerobot.com/).
3.  Create a new monitor:
    - **Type**: HTTP(s)
    - **URL**: Paste your Render URL.
    - **Interval**: 5 minutes.
    - This will "ping" your bot every 5 minutes, preventing it from sleeping.

## Note on "Per Server" Storage
Since Render's file system is **ephemeral** (files are wiped when the bot restarts or redeploys), the `data/` folder will be reset every time you deploy.
- **For a real production app**, you should replace the JSON file storage with a database like **MongoDB** (Render has a free MongoDB managed service too!).
- For now, this will work, but **active queues and channel IDs will be lost** if the bot restarts.
