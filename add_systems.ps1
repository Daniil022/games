# add_systems.ps1

$systemsCode = @'
    <script>
    var _gameName = document.title.replace(" - Игровой портал", "").replace("Игровой портал", "").trim();
    var _origAlert = window.alert;
    window.alert = function(msg) {
        if (typeof saveScore === "function" && msg.indexOf("Очки:") !== -1) {
            var scoreMatch = msg.match(/Очки:\s*(\d+)/);
            if (scoreMatch) {
                saveScore(_gameName, parseInt(scoreMatch[1]));
                if (typeof notifyRecord === "function") notifyRecord(_gameName, parseInt(scoreMatch[1]));
            }
        }
        if (typeof saveScore === "function" && msg.indexOf("Счёт:") !== -1) {
            var scoreMatch = msg.match(/Счёт:\s*(\d+)/);
            if (scoreMatch) {
                saveScore(_gameName, parseInt(scoreMatch[1]));
                if (typeof notifyRecord === "function") notifyRecord(_gameName, parseInt(scoreMatch[1]));
            }
        }
        _origAlert(msg);
    };
    </script>
'@

$shareBtn = '<button onclick="if(typeof shareResult===' + "'function'" + ')shareResult(_gameName,0)" style="position:fixed;bottom:60px;right:16px;z-index:999;padding:8px 12px;border-radius:20px;background:#30363d;color:#c9d1d9;border:1px solid #484f58;cursor:pointer;font-size:13px;">Share</button>'

Get-ChildItem -Filter *.html -Exclude index.html,admin.html | ForEach-Object {
    $name = $_.Name
    $content = Get-Content $_.FullName -Raw -Encoding UTF8

    if ($content -notmatch "saveScore") {
        $content = $content -replace '(</body>)', "$systemsCode`n`$1"
        Write-Host "OK Systems: $name"
    } else {
        Write-Host "SKIP Systems: $name"
    }

    if ($content -notmatch "shareResult") {
        $content = $content -replace '(</body>)', "$shareBtn`n`$1"
        Write-Host "OK Share: $name"
    } else {
        Write-Host "SKIP Share: $name"
    }

    [System.IO.File]::WriteAllText($_.FullName, $content, [System.Text.UTF8Encoding]::new($false))
}

Write-Host ""
Write-Host "Done!"