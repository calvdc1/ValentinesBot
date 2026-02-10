# Discord Blind Dating Bot

A Discord bot that manages a blind dating voice channel system.

## Features
- **Per-Server Isolation**: Each server has its own configuration and queue, stored in separate JSON files.
- **Lobby System**: Users join a "Lobby" voice channel and click a "Match Me" button.
- **Automated Matchmaking**: When two users are in the queue, the bot automatically:
  - Creates a private, hidden voice channel ("Date Room").
  - Moves both users to that room.
  - Ensures only those two users (and the bot) can see and access the room.
- **Auto-Cleanup**: Private rooms are deleted automatically when they become empty.
- **Queue Management**: Users are removed from the queue if they leave the Lobby before matching.
- **Permission Checks**: The bot checks for required permissions during setup and reports any missing ones.
- **Self-Matching (Testing)**: Currently enabled for testing - clicking "Match Me" twice will match you with yourself to verify channel creation and movement.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configuration**:
    - Rename `.env.example` to `.env` (or create it) and add your credentials:
    ```env
    DISCORD_TOKEN=your_bot_token
    CLIENT_ID=your_application_id
    ```

3.  **Register Commands**:
    ```bash
    node deploy-commands.js
    ```

4.  **Run the Bot**:
    ```bash
    node index.js
    ```

## Usage

1.  **In Discord**, an admin runs `/setup`.
    - This creates a **"Blind Dating"** category.
    - Creates a **"Lobby"** voice channel (users wait here).
    - Creates a **#dashboard** text channel with a "Match Me" button.
    - **Note**: If the bot replies with "Missing Permissions", check your server roles to ensure the bot has `Administrator` or `Manage Channels`, `Manage Roles`, and `Move Members` permissions.

2.  **Users**:
    - Join the "Lobby" VC.
    - Go to the #dashboard channel.
    - Click **"Match Me"**.

3.  **Bot**:
    - Once two users are in the queue, it creates a private room and moves them instantly.
    - If movement fails, the bot will log the error to the console and notify the channel.

## Troubleshooting

- **"Missing Permissions" Error**: ensure the Bot's role is higher than the users' roles in the Server Settings > Roles list, and that it has the `Administrator` permission.
- **Users not moving**: Ensure the bot has `Move Members` permission and that the user hasn't disconnected from Voice.
