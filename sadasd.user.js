// ==UserScript==
// @name         Genius React Mode
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Append ?react=1 to Genius artist and album pages
// @match        https://genius.com/artists/*
// @match        https://genius.com/albums/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    if (!location.search.includes('react=1')) {
        const sep = location.search ? '&' : '?';
        location.replace(location.href + sep + 'react=1');
    }
})();