// ====== 一覧表示 ======
async function loadArchive() {

  const res = await fetch("/blog/posts.json");
  const posts = await res.json();

  const container = document.getElementById("posts");

  container.innerHTML = posts.map(p => `
    <article>
      <h3>
        <a href="/blog/post.html?post=${p.category}/${p.slug}">
          ${p.title}
        </a>
      </h3>
      <small>${p.date}</small>
      <p>${p.summary}</p>
    </article>
  `).join("");
}

document.addEventListener("DOMContentLoaded", loadArchive);
