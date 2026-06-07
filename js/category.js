/* ==========================
   カテゴリ記事一覧描画
========================== */

async function renderCategory(category){

    try{

        const response=
            await fetch(
                "/data/posts.json"
            );

        const posts=
            await response.json();

        const filtered=
            posts.filter(

                article=>{

                    const currentCategory=

                        article.path
                        .split("/")[0];

                    return(

                        currentCategory===
                        category

                    );

                }

            );

        const container=

            document.getElementById(
                "posts"
            );

        container.innerHTML=

            filtered.map(

                article=>`

                <article class="article-card">

                    <h3>

                        <a href="/posts/?post=${article.path}">

                            ${formatTitle(
                                article.path
                            )}

                        </a>

                    </h3>

                </article>

                `

            ).join("");

    }

    catch(error){

        console.error(
            error
        );

    }

}


/* ==========================
   タイトル整形
========================== */

function formatTitle(path){

    return path

    .split("/")

    .pop()

    .replace(".md","")

    .replaceAll("-"," ");

}
