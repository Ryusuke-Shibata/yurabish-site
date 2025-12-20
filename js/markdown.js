async function loadMarkdown() {
  const params = new URLSearchParams(location.search);
  const file = params.get("post");

  if (!file) {
    document.getElementById("content").textContent =
      "記事が指定されていません";
    return;
  }

  const res = await fetch(`/posts/${file}.md`);
  const text = await res.text();

  // --- Front Matter 分離 ---
  const match = text.match(/^---([\s\S]*?)---([\s\S]*)$/);

  let meta = {};
  let body = text;

  if (match) {
    const metaText = match[1];
    body = match[2];

    metaText.split("\n").forEach(line => {
      const [key, ...rest] = line.split(":");
      if (!key) return;
      meta[key.trim()] = rest.join(":").trim();
    });
  }

  // --- メタデータ反映 ---
  if (meta.title) {
    document.title = meta.title;
    document.getElementById("page-title").textContent = meta.title;
    document.getElementById("post-title").textContent = meta.title;
  }

  if (meta.date) {
    const timeEl = document.getElementById("post-date");
    timeEl.textContent = meta.date;
    timeEl.setAttribute("datetime", meta.date);
  }

  if (meta.category) {
    document.getElementById("post-category").textContent = meta.category;
  }

  // --- 本文描画 ---
  document.getElementById("content").innerHTML = marked.parse(body);
}

loadMarkdown();
