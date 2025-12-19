async function loadMarkdown() {
  const params = new URLSearchParams(location.search);
  const file = params.get("post");

  if (!file) {
    document.getElementById("content").textContent = "記事が指定されていません";
    return;
  }

  const res = await fetch(`/posts/${file}.md`);
  const text = await res.text();

  document.getElementById("content").innerHTML = marked.parse(text);
}

loadMarkdown();
