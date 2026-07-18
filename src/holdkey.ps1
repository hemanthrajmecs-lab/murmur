# Hold-to-talk key watcher.
# Prints "DOWN" when ALL of the given virtual-key codes are pressed together,
# and "UP" when they are no longer all pressed. Reads physical key state, so it
# is immune to keyboard auto-repeat (unlike a global shortcut).
param([string]$Keys)

Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class Kbd {
  [DllImport("user32.dll")] public static extern short GetAsyncKeyState(int vKey);
}
"@

$vks = $Keys.Split(',') | ForEach-Object { [int]$_ }
$isDown = $false

while ($true) {
  $all = $true
  foreach ($vk in $vks) {
    if (([Kbd]::GetAsyncKeyState($vk) -band 0x8000) -eq 0) { $all = $false; break }
  }
  if ($all -and -not $isDown) {
    $isDown = $true
    [Console]::Out.WriteLine("DOWN"); [Console]::Out.Flush()
  } elseif (-not $all -and $isDown) {
    $isDown = $false
    [Console]::Out.WriteLine("UP"); [Console]::Out.Flush()
  }
  Start-Sleep -Milliseconds 15
}
