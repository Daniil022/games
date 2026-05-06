// theme.js — Глобальная тема для игрового портала
(function() {
    var theme = localStorage.getItem('fario_theme') || 'dark';
    var toggleBtn = document.getElementById('themeToggle');
    
    function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        if (t === 'light') {
            document.body.style.background = '#f6f8fa';
            document.body.style.color = '#24292f';
            var cards = document.querySelectorAll('.container, .card, .game-card');
            cards.forEach(function(c) {
                c.style.background = '#fff';
                c.style.borderColor = '#d0d7de';
            });
            var texts = document.querySelectorAll('h1, h2, .game-name, .score, .status, .subtitle');
            texts.forEach(function(t) { t.style.color = '#24292f'; });
            var descs = document.querySelectorAll('.game-desc, .subtitle');
            descs.forEach(function(d) { d.style.color = '#57606a'; });
            if (toggleBtn) toggleBtn.textContent = '🌙 Тёмная тема';
        } else {
            document.body.style.background = '#0d1117';
            document.body.style.color = '#c9d1d9';
            var cards = document.querySelectorAll('.container, .card, .game-card');
            cards.forEach(function(c) {
                c.style.background = '#161b22';
                c.style.borderColor = '#30363d';
            });
            var texts = document.querySelectorAll('h1, h2, .game-name, .score, .status, .subtitle');
            texts.forEach(function(t) { t.style.color = '#f0f6fc'; });
            var descs = document.querySelectorAll('.game-desc, .subtitle');
            descs.forEach(function(d) { d.style.color = '#8b949e'; });
            if (toggleBtn) toggleBtn.textContent = '☀️ Светлая тема';
        }
    }
    
    window.toggleTheme = function() {
        theme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('fario_theme', theme);
        applyTheme(theme);
    };
    
    applyTheme(theme);
})();
