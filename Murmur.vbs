' Launches Murmur silently (no terminal / console window).
' Works from wherever this file lives - no hardcoded paths.
Set fso = CreateObject("Scripting.FileSystemObject")
appDir = fso.GetParentFolderName(WScript.ScriptFullName)
Set sh = CreateObject("WScript.Shell")
sh.CurrentDirectory = appDir
sh.Run """" & appDir & "\node_modules\electron\dist\electron.exe"" """ & appDir & """", 0, False
