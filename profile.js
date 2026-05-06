// profile.js — Профили, рекорды, достижения
(function() {
    var profile = JSON.parse(localStorage.getItem('fario_profile') || '{"name":"Игрок","avatar":"🎮","coins":0,"records":{},"achievements":[]}');
    
    window.getProfile = function() { return profile; };
    
    window.saveScore = function(game, score) {
        if (!profile.records[game] || score > profile.records[game]) {
            profile.records[game] = score;
            profile.coins += Math.floor(score / 10);
            checkAchievement(game, score);
            localStorage.setItem('fario_profile', JSON.stringify(profile));
        }
    };
    
    window.addCoins = function(amount) {
        profile.coins += amount;
        localStorage.setItem('fario_profile', JSON.stringify(profile));
        updateCoinDisplay();
    };
    
    window.spendCoins = function(amount) {
        if (profile.coins >= amount) {
            profile.coins -= amount;
            localStorage.setItem('fario_profile', JSON.stringify(profile));
            updateCoinDisplay();
            return true;
        }
        return false;
    };
    
    function checkAchievement(game, score) {
        var newAch = [];
        if (score >= 1000 && profile.achievements.indexOf('score_1000') === -1) {
            profile.achievements.push('score_1000');
            newAch.push('🏆 Набрал 1000 очков!');
        }
        if (score >= 5000 && profile.achievements.indexOf('score_5000') === -1) {
            profile.achievements.push('score_5000');
            newAch.push('👑 Мастер 5000 очков!');
        }
        if (profile.achievements.length >= 5 && profile.achievements.indexOf('collector') === -1) {
            profile.achievements.push('collector');
            newAch.push('⭐ Коллекционер достижений!');
        }
        newAch.forEach(function(a) { alert('🎉 Достижение: ' + a); profile.coins += 100; });
        localStorage.setItem('fario_profile', JSON.stringify(profile));
        updateCoinDisplay();
    }
    
    function updateCoinDisplay() {
        var el = document.getElementById('coinDisplay');
        if (el) el.textContent = profile.coins;
    }
    
    window.showProfile = function() {
        var recs = '';
        for (var game in profile.records) {
            recs += game + ': ' + profile.records[game] + '\n';
        }
        alert('👤 ' + profile.name + ' ' + profile.avatar + '\n💰 Монет: ' + profile.coins + '\n🏆 Достижений: ' + profile.achievements.length + '\n📊 Рекорды:\n' + (recs || 'Нет рекордов'));
    };
    
    updateCoinDisplay();
})();
