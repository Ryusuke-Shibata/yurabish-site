// ====== 一覧表示 ======
async function loadArchive() {
  const list = document.getElementById("posts-list");
  if (!list) return;

  try {
    const res = await fetch("/blog/posts.json", { cache: "no-cache" });
    console.log("fetch result:", res); // ★追加
    const posts = await res.json();
    console.log("posts.json raw:", posts); // ★追加
    renderPosts(posts, list);
  } catch (err) {
    console.error("LoadPosts Error:", err); // ★強化
    list.innerHTML = "<p>投稿を読み込めませんでした</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadArchive);
