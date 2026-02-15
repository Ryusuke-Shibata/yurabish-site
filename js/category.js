async function renderCategory(category) {

  const posts = await loadPosts();

  const filtered = posts
    .filter(p => p.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const container = document.getElementById("posts");

  container.innerHTML = filtered.map(p => `
    <article>
      <h2>
        <a href="/blog/post.html?post=${p.category}/${p.slug}">
          ${p.title}
        </a>
      </h2>
      <small>${p.date}</small>
      <p>${p.summary}</p>
    </article>
  `).join("");

}
