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

document.addEventListener("DOMContentLoaded", loadLatestPost);
