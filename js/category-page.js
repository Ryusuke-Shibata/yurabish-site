document.addEventListener(
  "DOMContentLoaded",

  () => {

    const page =
      document.querySelector(
        ".category-page"
      );

    if (!page) {
      return;
    }

    const category =
      page.dataset.category;

    const title =
      page.dataset.title;

    const description =
      page.dataset.description;

    document.getElementById(
      "category-title"
    ).textContent =
      title;

    document.getElementById(
      "category-description"
    ).textContent =
      description;

    renderCategory(
      category
    );

  }
);
