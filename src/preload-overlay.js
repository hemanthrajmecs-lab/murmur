const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('flow', {
  onState: (cb) => ipcRenderer.on('state', (e, payload) => cb(payload)),
});
