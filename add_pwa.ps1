# add_pwa.ps1
$pwaCode = @'
    <!-- PWA -->
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

Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -notmatch "manifest.json") {
        $content = $content -replace "(<title>)", "$pwaCode`n`n$1"
        Set-Content $_.FullName $content -Encoding UTF8
        Write-Host "✅ Обновлён: $($_.Name)"
    } else {
        Write-Host "⏭️ Пропущен: $($_.Name)"
    }
}
Write-Host "Готово!"