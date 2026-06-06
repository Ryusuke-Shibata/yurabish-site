/* ==========================
   カテゴリ記事一覧描画
========================== */

async function renderCategory(category){

    const response = await fetch(

        "/data/posts.json"

    );

    const posts = await response.json();


    const filtered = posts

        .filter(

            p => p.category === category

        )

        .sort(

            (a,b)=>

            new Date(b.date)

            -

            new Date(a.date)

        );


    const container = document.getElementById(

        "posts"

    );


    container.innerHTML = filtered.map(

        p=>`

        <article class="article-card">

            <small>

                ${p.date}

            </small>

            <h3>

                <a href="/posts/?post=${p.category}/${p.slug}">

                    ${p.title}

                </a>

            </h3>

            <p>

                ${p.summary}

            </p>

        </article>

        `

    ).join("");

}
