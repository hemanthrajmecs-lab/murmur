const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('hist', {
  get: () => ipcRenderer.invoke('get-history'),
  copy: (text) => ipcRenderer.invoke('history-copy', text),
  clear: () => ipcRenderer.invoke('history-clear'),
  remove: (ts) => ipcRenderer.invoke('history-delete', ts),
  onUpdate: (cb) => ipcRenderer.on('history-updated', () => cb()),
});
