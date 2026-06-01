// ======================
// カテゴリごとの記事一覧
// ======================
async function renderCategory(
  category
) {

  try {

    const res =
      await fetch(
        "/data/posts.json",
        {
          cache: "no-cache"
        }
      );

    if (!res.ok) {

      throw new Error(
        "posts取得失敗"
      );

    }

    const posts =
      await res.json();

    const filtered =
      posts
        .filter(
          p =>
            p.category === category
        )
        .sort(
          (a, b) =>
            new Date(
              b.date
            ) -
            new Date(
              a.date
            )
        );

    const container =
      document.getElementById(
        "posts"
      );

    if (
      filtered.length === 0
    ) {

      container.innerHTML =
        "<p>記事がありません</p>";

      return;

    }

    container.innerHTML =
      filtered.map(
        p => {

          const url =
            `/blog/post.html?post=/posts/${p.category}/${p.slug}.md`;

          return `
            <article class="post-card">

              <h3>

                <a href="${url}">
                  ${p.title}
                </a>

              </h3>

              <small>
                ${p.date}
              </small>

              <p>
                ${p.summary}
              </p>

            </article>
          `;

        }
      ).join("");

  } catch(error) {

    console.error(
      error
    );

  }

}
