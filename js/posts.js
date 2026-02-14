async function loadPosts() {
  const res = await fetch("/blog/posts.json");
  return await res.json();
}
