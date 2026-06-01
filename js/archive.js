// ======================
// 記事一覧表示
// ======================
document.addEventListener(
  "DOMContentLoaded",

  async () => {

    const list =
      document.getElementById(
        "posts-list"
      );

    if (!list) {
      return;
    }

    const posts =
      await getPosts();

    list.innerHTML =
      posts.map(post => {

        const url =
          `/blog/post?post=/posts/${post.category}/${post.slug}.md`;

        return `
          <article class="post-card">

            <h2>
              <a href="${url}">
                ${post.title}
              </a>
            </h2>

            <small>
              ${post.date}
            </small>

            <p>
              ${post.summary}
            </p>

          </article>
        `;

      }).join("");

  }
);
