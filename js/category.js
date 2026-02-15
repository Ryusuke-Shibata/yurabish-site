async function renderCategory(category) {

  const res = await fetch("/blog/posts.json");
  const posts = await res.json();

  const filtered = posts
    .filter(p => p.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const container = document.getElementById("posts");

  container.innerHTML = filtered.map(p => `
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
