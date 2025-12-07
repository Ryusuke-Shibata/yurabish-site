// ====== ヘッダー・フッターの読み込み ======
async function includeParts() {
  const includes = document.querySelectorAll('[data-include]');
  for (const el of includes) {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error(`Failed: ${url}`);
      const html = await res.text();
      el.outerHTML = html;
    } catch (err) {
      console.error(err);
      el.innerHTML = `<div>読込失敗: ${url}</div>`;
    }
  }
}

// ====== 最新記事1件表示 ======
async function loadLatestPost() {
  const el = document.getElementById("latest-post");
  if (!el) return;

  try {
    const res = await fetch("./blog/posts.json", { cache: "no-cache" });
    const posts = await res.json();
    const latest = posts[0];

    el.innerHTML = `
      <a href="${latest.url}">
        <strong>${latest.title}</strong><br>
        <small>${latest.date}</small>
      </a>
    `;
  } catch (err) {
    console.error(err);
  }
}

// ====== 一覧表示 ======
async function loadPosts() {
  const list = document.getElementById("posts-list");
  if (!list) return;

  try {
    const res = await fetch("./blog/posts.json", { cache: "no-cache" });
    const posts = await res.json();

    list.innerHTML = posts.map(post => `
      <article class="post-item">
        <h2><a href="${post.url}">${post.title}</a></h2>
        <small>${post.date} | ${post.category}</small>
        <p>${post.summary}</p>
      </article>
    `).join("");
  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>投稿を読み込めませんでした</p>";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await includeParts();
  loadLatestPost();
  loadPosts();
});
