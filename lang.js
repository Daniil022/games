// lang.js — Мультиязычность для игрового портала
var LANG = localStorage.getItem('fario_lang') || 'ru';

var translations = {
    ru: {
        back: '← Назад к играм',
        new_game: '🔄 Новая игра',
        score: 'Очки',
        balance: 'Баланс',
        settings: 'Настройки',
        language: 'Язык',
        theme: 'Тема',
        profile: 'Профиль',
        coins: 'Монеты',
        achievements: 'Достижения',
        records: 'Рекорды',
        share: 'Поделиться',
        win: 'Победа!',
        lose: 'Поражение',
        draw: 'Ничья',
        play: 'Играть',
        reset: 'Сброс',
        close: 'Закрыть'
    },
    en: {
        back: '← Back to games',
        new_game: '🔄 New game',
        score: 'Score',
        balance: 'Balance',
        settings: 'Settings',
        language: 'Language',
        theme: 'Theme',
        profile: 'Profile',
        coins: 'Coins',
        achievements: 'Achievements',
        records: 'Records',
        share: 'Share',
        win: 'You win!',
        lose: 'You lose',
        draw: 'Draw',
        play: 'Play',
        reset: 'Reset',
        close: 'Close'
    }
};

window.t = function(key) {
    return translations[LANG] && translations[LANG][key] ? translations[LANG][key] : key;
};

window.toggleLang = function() {
    LANG = LANG === 'ru' ? 'en' : 'ru';
    localStorage.setItem('fario_lang', LANG);
    location.reload();
};

window.getLang = function() {
    return LANG;
};
