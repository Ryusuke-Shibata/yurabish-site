// include.js
document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll('[data-include]');

  includes.forEach(async el => {
    const url = el.getAttribute('data-include');
    try {
      // キャッシュ利用（ブラウザキャッシュ）を意識する単純fetch
      const res = await fetch(url, {cache: "no-cache"}); // no-cacheにして更新を反映しやすく
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
      const html = await res.text();
      el.outerHTML = html;

      // ナビの現在地ハイライト（header内の[data-nav]リンクを利用）
      // これ実行はafter-insertのタイミングなので setTimeout を入れても良い
      try {
        const loc = location.pathname.replace(/\/$/, '') || '/';
        document.querySelectorAll('nav a[data-nav]').forEach(a => {
          const href = a.getAttribute('href').replace(/\/$/, '') || '/';
          if (href === loc) a.classList.add('is-active');
        });
      } catch (e) { /* ignore */ }

    } catch (err) {
      console.error(err);
      // フェイルセーフ：簡易表示を残す
      el.innerHTML = `<div style="color:#f00">読み込み失敗: ${url}</div>`;
    }
  });
});
