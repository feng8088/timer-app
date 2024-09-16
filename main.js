const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 350,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    alwaysOnTop: true  // 添加这一行来使窗口始终保持在最前面
  })

  win.loadFile('index.html')

  // 创建一个空的菜单，这样就不会显示默认菜单，但保留了系统控制按钮
  const menu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(menu)

  // 可选：添加一个全局快捷键来切换 alwaysOnTop 状态
  const { globalShortcut } = require('electron')
  globalShortcut.register('CommandOrControl+`', () => {
    win.setAlwaysOnTop(!win.isAlwaysOnTop())
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('will-quit', () => {
  // 取消注册所有快捷键
  globalShortcut.unregisterAll()
})