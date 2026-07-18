# 🎙️ Murmur

**Free, open-source voice dictation for Windows.** Hold a key (or a mouse
button), speak, and your words are transcribed and typed into whatever app
you're using — Word, Chrome, Slack, VS Code, anywhere.

A lightweight, self-hosted alternative to paid dictation apps. You bring your
own **free** [Groq](https://groq.com) API key — no subscription, no middleman.

> Independent open-source project. Not affiliated with, or endorsed by, any
> commercial dictation product.

---

## ✨ Features

- **Hold-to-talk** — hold your key, speak, release. Text appears where your cursor is.
- **Works everywhere** — types into any app.
- **Fast, accurate** — powered by Groq Whisper (`whisper-large-v3`).
- **Keyboard key *or* mouse button** — e.g. `F9`, `RightCtrl`, or a thumb button (`Mouse4` / `Mouse5`).
- **Optional AI cleanup** — a Groq LLM fixes grammar/punctuation and removes "um/uh" and false starts (same key).
- **Transcript history** — every dictation is saved, searchable, and one-click copyable, so nothing is ever lost.
- **Runs in the tray** — quietly in the background; optional start-at-login.
- **Private** — your key and transcripts stay on your PC. Audio goes to Groq only while transcribing.

---

## 🚀 Install & run — step by step

New to this? Follow these in order. It takes about 5 minutes.

### 1. Install Node.js
Go to **https://nodejs.org**, download the **LTS** version, run the installer,
and click **Next** through it. (This gives your PC the `node` and `npm` commands.)

### 2. Download Murmur
Two options — pick one:

- **Easy (no git):** Click the green **`< > Code`** button at the top of this
  page → **Download ZIP**. Unzip it somewhere easy, like your Desktop.
- **With git:**
  ```bash
  git clone https://github.com/hemanthrajmecs-lab/murmur.git
  ```

### 3. Open a terminal inside the folder
Open the Murmur folder in File Explorer. Click the **address bar**, type `cmd`,
and press **Enter** — a black terminal window opens in that folder.

### 4. Install the app's parts
In that terminal, type:
```bash
npm install
```
This downloads Electron (a few hundred MB) once. Wait for it to finish.

### 5. Get your free Groq API key
1. Go to **https://console.groq.com/keys**
2. Sign in (Google or GitHub works).
3. Click **Create API Key**, give it any name, and **copy** the `gsk_...` value.

### 6. Start Murmur
In the same terminal, type:
```bash
npm start
```
A **Settings** window opens. Paste your key → click **Test** (should say
"✓ Key works") → click **Save**.

### 7. Use it 🎉
Click into any app (try Notepad). **Hold** `Ctrl+Shift+Space`, speak a sentence,
then **release**. Your words get typed in.

---

## 🖥️ Open it later without a terminal

Once installed, you don't need the terminal again:

- **Double-click `Murmur.vbs`** in the folder — it starts silently in your tray.
- For a desktop icon: right-click `Murmur.vbs` → **Send to → Desktop (create
  shortcut)**. Rename it "Murmur", and (optional) set its icon to
  `assets/icon.ico` via the shortcut's Properties → Change Icon.
- To have it start with Windows: tray icon → **Start at login**.

Murmur lives in your **system tray** (bottom-right, near the clock — click the
`^` arrow if it's hidden). **Right-click** it for History, Settings, and Quit.

---

## ⚙️ Settings

| Setting | What it does |
|---|---|
| **Hold-to-talk key** | Key or mouse button to hold. Keys: `F9`, `RightCtrl`, combos like `Control+Shift+Space`. Mouse: `Mouse4` (back), `Mouse5` (forward), `MiddleMouse`. |
| **Model** | `whisper-large-v3-turbo` (fast) or `whisper-large-v3` (best). |
| **Language** | Auto-detect, or pin a language for better accuracy. |
| **Light cleanup** | Local capitalisation/punctuation fixes; trims fillers. |
| **AI cleanup** | Sends the transcript to a Groq LLM for a full polish. Falls back to light cleanup if offline. |
| **Auto-paste** | On: types into the focused app. Off: just copies to clipboard. |
| **Start at login** | Launch automatically with Windows. |

Change the hotkey anytime: right-click the tray icon → **Settings** → type your
key in **Hold-to-talk key** → **Save**.

---

## 🔒 Privacy

- Your API key and transcript history are stored **only** on your PC
  (`%APPDATA%\murmur\`) — never uploaded by this app.
- Audio is sent to Groq **only** during transcription and isn't stored by Murmur.

## 🛠️ Requirements

- Windows 10 / 11
- [Node.js](https://nodejs.org) 18+
- A free [Groq API key](https://console.groq.com/keys)

## 🐛 Troubleshooting

- **Nothing gets typed?** Check **Windows Settings → Privacy & security →
  Microphone** and allow desktop apps to use the mic.
- **"Invalid API key"?** Re-copy your key from the Groq console and re-save.
- **Hotkey does nothing?** Make sure Murmur is running (tray icon present) and
  the key in Settings matches what you're pressing.

## 🤝 Contributing

Issues and pull requests welcome. The whole app lives in [`src/`](src/).

## 📄 License

[MIT](LICENSE) © 2026 Hemanth Raj
