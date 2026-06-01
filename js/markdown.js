document.addEventListener(
  "DOMContentLoaded",

  async () => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const file =
      params.get(
        "post"
      );

    if (!file) {

      document.getElementById(
        "content"
      ).innerHTML =
        "<p>記事が見つかりません。</p>";

      return;

    }

    try {

      const res =
        await fetch(
          file,
          {
            cache: "no-cache"
          }
        );

      if (!res.ok) {

        throw new Error(
          "Markdown読込失敗"
        );

      }

      const markdown =
        await res.text();

      document.getElementById(
        "content"
      ).innerHTML =
        marked.parse(
          markdown
        );

      const title =
        markdown.match(
          /^#\s+(.+)$/m
        );

      if (title) {

        const titleText =
          title[1];

        document.title =
          `${titleText} | SairyHub`;

        document.getElementById(
          "post-title"
        ).textContent =
          titleText;

      }

    } catch(error) {

      console.error(
        error
      );

      document.getElementById(
        "content"
      ).innerHTML =
        "<p>記事を読み込めませんでした。</p>";

    }

  }
);
