// ======================
// 共通パーツ読込
// ======================

async function includeParts() {

  const elements =
    document.querySelectorAll(
      "[data-include]"
    );

  for (const el of elements) {

    const path =
      el.dataset.include;

    try {

      const res =
        await fetch(
          path,
          {
            cache: "no-cache"
          }
        );

      if (!res.ok) {

        throw new Error(
          `${path} の読込失敗`
        );

      }

      const html =
        await res.text();

      el.outerHTML =
        html;

    }

    catch(error){

      console.error(error);

      el.innerHTML =

      `
      <p>
      読込失敗
      </p>
      `;

    }

  }

}

document.addEventListener(
  "DOMContentLoaded",
  includeParts
);
