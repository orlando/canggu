'use strict';
const electron = require('electron');
const app = electron.app;

let mainWindow;

function onClosed() {
  mainWindow = null;
}

function createMainWindow() {
  const win = new electron.BrowserWindow({
    width: 1280,
    height: 960,
    minWidth: 1290,
    minHeight: 960,
    frame: false
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', onClosed);

  return win;
}

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
});
