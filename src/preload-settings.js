const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('settings', {
  get: () => ipcRenderer.invoke('get-config'),
  save: (cfg) => ipcRenderer.invoke('save-config', cfg),
  testKey: (key) => ipcRenderer.invoke('test-key', key),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
});
