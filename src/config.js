const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const DEFAULTS = {
  groqApiKey: '',
  model: 'whisper-large-v3-turbo',
  hotkey: 'Control+Shift+Space',
  language: 'auto',      // 'auto' or an ISO code like 'en'
  cleanup: 'light',      // 'light' | 'none' (local rule-based cleanup)
  aiCleanup: false,      // send transcript to a Groq LLM to polish it
  aiModel: 'llama-3.1-8b-instant',
  autoPaste: true,       // paste into the focused app automatically
  startAtLogin: false,
};

function configPath() {
  return path.join(app.getPath('userData'), 'config.json');
}

function loadConfig() {
  try {
    let raw = fs.readFileSync(configPath(), 'utf8');
    if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1); // strip UTF-8 BOM if present
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

function saveConfig(cfg) {
  const merged = { ...DEFAULTS, ...cfg };
  fs.writeFileSync(configPath(), JSON.stringify(merged, null, 2), 'utf8');
  return merged;
}

module.exports = { loadConfig, saveConfig, DEFAULTS, configPath };
