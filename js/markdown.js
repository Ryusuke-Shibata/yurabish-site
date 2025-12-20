async function loadMarkdown() {
  const params = new URLSearchParams(location.search);
  const file = params.get("post");

  if (!file) {
    document.getElementById("content").textContent = "記事が指定されていません";
    return;
  }

  // ★ パスが変わった点に注意
  const res = await fetch(`/blog/te/${file}.md`);
  const raw = await res.text();

  // BOM除去（超重要）
  const text = raw.replace(/^\uFEFF/, "");

  // Front Matter を安全に分離
  const match = text.match(/^\s*---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

  let meta = {};
  let body = text;

  if (match) {
    const metaText = match[1];
    body = match[2];

    metaText.split("\n").forEach(line => {
      const [key, ...rest] = line.split(":");
      if (!key || rest.length === 0) return;
      meta[key.trim()] = rest.join(":").trim();
    });
  }

  /* ===== メタデータ反映 ===== */

  // title
  if (meta.title) {
    document.title = meta.title;
    const h1 = document.querySelector(".post-title");
    if (h1) h1.textContent = meta.title;
  }

  // date
  if (meta.date) {
    const time = document.querySelector(".post-meta time");
    if (time) {
      time.dateTime = meta.date;
      time.textContent = meta.date.replace(/-/g, "年") + "日";
    }
  }

  // category
  if (meta.category) {
    const cat = document.querySelector(".post-meta .category");
    if (cat) cat.textContent = meta.category;
  }

  // 本文
  document.getElementById("content").innerHTML = marked.parse(body);
}

loadMarkdown();

console.log("post-title:", document.querySelector(".post-title"));
console.log("category:", document.querySelector(".category"));
