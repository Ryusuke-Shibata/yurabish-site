/* ========================================
   カテゴリページの記事一覧表示

   役割:
   1. posts.jsonを取得
   2. 指定カテゴリのみ抽出
   3. 日付順に並べ替え
   4. HTMLを生成して表示
======================================== */

async function renderCategory(
  category
) {

  try {

    /* ========================================
       記事一覧データ取得
       
       /data/posts.jsonから
       記事メタ情報を取得する
    ======================================== */

    const response =
      await fetch(
        "/data/posts.json",
        {
          cache: "no-cache"
        }
      );

    if (
      !response.ok
    ) {

      throw new Error(
        "posts.jsonの取得失敗"
      );

    }

    const posts =
      await response.json();



    /* ========================================
       カテゴリ抽出＋日付順ソート

       p.category === category
       → 指定カテゴリだけ残す

       新しい記事を上に表示
    ======================================== */

    const filteredPosts =
      posts
        .filter(
          post =>
            post.category === category
        )
        .sort(
          (
            a,
            b
          ) =>

            new Date(
              b.date
            ) -

            new Date(
              a.date
            )
        );



    /* ========================================
       表示先取得

       HTML側の

       <div id="posts">

       に記事を追加する
    ======================================== */

    const container =
      document.getElementById(
        "posts"
      );



    /* ========================================
       記事が0件だった場合
    ======================================== */

    if (
      filteredPosts.length === 0
    ) {

      container.innerHTML =
      `
        <p>
          記事がありません
        </p>
      `;

      return;

    }



    /* ========================================
       記事カードHTML生成

       map():
       配列をHTMLへ変換

       join():
       配列→文字列へ変換
    ======================================== */

    container.innerHTML =

      filteredPosts.map(
        post => {

          /* ========================
             記事URL生成

             例:

             /posts/te/ms900-01.md
          ======================== */

          const postUrl =

            `/blog/post.html?post=/posts/${post.category}/${post.slug}.md`;



          /* ========================
             タグHTML生成
          ======================== */

          const tags =

            post.tags
            ?.map(
              tag =>

              `
              <span>
                #${tag}
              </span>
              `
            )
            .join(

              ""

            )

            ||

            "";



          /* ========================
             記事カード生成
          ======================== */

          return `

            <article
              class="article-card"
            >

              <a
                href="${postUrl}"
              >

                <div
                  class="card-date"
                >

                  ${post.date}

                </div>

                <h3>

                  ${post.title}

                </h3>

                <p>

                  ${post.summary}

                </p>

                <div
                  class="card-tags"
                >

                  ${tags}

                </div>

              </a>

            </article>

          `;

        }

      ).join("");

  }



  /* ========================================
     エラー発生時
  ======================================== */

  catch (
    error
  ) {

    console.error(
      "Category Error:",
      error
    );

    document.getElementById(
      "posts"
    ).innerHTML =

    `
      <p>
        読み込みに失敗しました
      </p>
    `;

  }

}
