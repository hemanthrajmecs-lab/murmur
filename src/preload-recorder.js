const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('flow', {
  onStart: (cb) => ipcRenderer.on('start', () => cb()),
  onStop: (cb) => ipcRenderer.on('stop', () => cb()),
  sendAudio: (arrayBuffer) => ipcRenderer.send('audio', arrayBuffer),
  sendError: (msg) => ipcRenderer.send('recorder-error', msg),
  log: (msg) => ipcRenderer.send('recorder-log', msg),
});
