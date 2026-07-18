# Diagnostic: prints the virtual-key code of whatever button/key you press.
# Ignores normal left/right mouse clicks so they don't spam the output.
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class Kbd {
  [DllImport("user32.dll")] public static extern short GetAsyncKeyState(int vKey);
}
"@

$names = @{
  4  = 'Middle mouse / scroll-click';
  5  = 'Mouse thumb button 4 (Back)';
  6  = 'Mouse thumb button 5 (Forward)';
}

$prev = @{}
Write-Output "Ready - press your mouse button now (watching 25s)..."
$deadline = (Get-Date).AddSeconds(25)
while ((Get-Date) -lt $deadline) {
  for ($vk = 0x03; $vk -le 0xFE; $vk++) {
    $down = ([Kbd]::GetAsyncKeyState($vk) -band 0x8000) -ne 0
    if ($down -and -not $prev[$vk]) {
      $label = if ($names.ContainsKey($vk)) { $names[$vk] } else { "key/other" }
      ("DETECTED  code={0}  hex=0x{1:X2}  ->  {2}" -f $vk, $vk, $label) | Write-Output
    }
    $prev[$vk] = $down
  }
  Start-Sleep -Milliseconds 20
}
Write-Output "Done watching."
