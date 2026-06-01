// ======================
// 最新記事表示
// ======================

document.addEventListener(

  "DOMContentLoaded",

  async()=>{

    const target=

      document.getElementById(
        "latest-post"
      );

    if(!target) return;

    const posts=
      await getPosts();

    if(posts.length===0){

      target.innerHTML=

      `
      <p>
      記事がありません
      </p>
      `;

      return;

    }

    const latest=
      posts[0];

    target.innerHTML=

    `
    <a href="${latest.url}">
      <strong>
        ${latest.title}
      </strong>

      <br>

      <small>
        ${latest.date}
      </small>

    </a>
    `;

});
