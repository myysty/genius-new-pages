// ==UserScript==
// @namespace    http://tampermonkey.net/
// @version      2.0
// @name         Genius React Mode
// @description  Append ?react=1 to Genius artist and album pages
// @match        https://genius.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function appendReact(url) {
        if (url.includes('react=1')) return url;
        return url + (url.includes('?') ? '&' : '?') + 'react=1';
    }

    if (/\/(artists|albums)\//.test(location.pathname) && !location.search.includes('react=1')) {
        location.replace(appendReact(location.href));
        return;
    }

    function rewriteLinks(root) {
        root.querySelectorAll('a[href*="/artists/"], a[href*="/albums/"]').forEach(function (a) {
            a.href = appendReact(a.href);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        rewriteLinks(document);
        new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                m.addedNodes.forEach(function (node) {
                    if (node.nodeType === 1) rewriteLinks(node);
                });
            });
        }).observe(document.body, { childList: true, subtree: true });
    });
})();
