# update_all.ps1

$pwaHead = @'
    <link rel="manifest" href="manifest.json">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <script>
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/games/sw.js");
    }
    </script>
    <script src="theme.js"></script>
    <script src="profile.js"></script>
'@

$themeBtn = '<button id="themeToggle" onclick="toggleTheme()" style="position:fixed;bottom:16px;right:16px;z-index:999;padding:10px 14px;border-radius:20px;background:#30363d;color:#c9d1d9;border:1px solid #484f58;cursor:pointer;font-size:14px;">Theme</button>'

Get-ChildItem -Filter *.html | ForEach-Object {
    $name = $_.Name
    $content = Get-Content $_.FullName -Raw -Encoding UTF8

    if ($content -notmatch "manifest.json") {
        $content = $content -replace '(<meta name="viewport"[^>]*>)', "`$1`n$pwaHead"
        Write-Host "OK PWA: $name"
    } else {
        Write-Host "SKIP PWA: $name"
    }

    if ($content -notmatch "toggleTheme") {
        $content = $content -replace '(</body>)', "$themeBtn`n`$1"
        Write-Host "OK Theme: $name"
    } else {
        Write-Host "SKIP Theme: $name"
    }

    [System.IO.File]::WriteAllText($_.FullName, $content, [System.Text.UTF8Encoding]::new($false))
}

Write-Host "Done! Now run: git add . ; git commit -m update ; git push"