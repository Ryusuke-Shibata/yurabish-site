async function loadMarkdown() {
  const params = new URLSearchParams(location.search);
  const file = params.get("post");

  if (!file) {
    document.getElementById("content").textContent = "記事が指定されていません";
    return;
  }

  const res = await fetch(`/posts/${file}.md`);
  const text = await res.text();

  // --- Front Matter を分離 ---
  let meta = {};
  let body = text;

  if (text.startsWith("---")) {
    const parts = text.split("---");
    const metaText = parts[1];
    body = parts.slice(2).join("---");

    metaText.trim().split("\n").forEach(line => {
      const [key, ...rest] = line.split(":");
      meta[key.trim()] = rest.join(":").trim();
    });
  }

  // --- メタデータ反映 ---
  if (meta.title) {
    document.title = meta.title;
    const titleEl = document.getElementById("post-title");
    if (titleEl) titleEl.textContent = meta.title;
  }

  if (meta.date) {
    const dateEl = document.getElementById("post-date");
    if (dateEl) dateEl.textContent = meta.date;
  }

  // --- 本文をMarkdownとして描画 ---
  document.getElementById("content").innerHTML = marked.parse(body);
}

loadMarkdown();
