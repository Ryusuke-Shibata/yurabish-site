// ====== ヘッダー・フッターの読み込み ======
async function includeParts() {
  const elements = document.querySelectorAll("[data-include]");

  for (const el of elements) {
    const url = el.getAttribute("data-include");

    try {
      const res = await fetch(url);
      const html = await res.text();
      el.outerHTML = html;
    } catch (err) {
      console.error("Include error:", url, err);
    }
  }
}

document.addEventListener("DOMContentLoaded", includeParts);
