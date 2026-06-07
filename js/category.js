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

                article=>

                    article.path
                    .startsWith(
                        `${category}/`
                    )

            );

        const articles=

            await Promise.all(

                filtered.map(

                    article=>

                    loadArticleMeta(
                        article.path
                    )

                )

            );

        const container=

            document.getElementById(
                "posts"
            );

        container.innerHTML=

            articles.map(

                article=>`

                <article class="article-card">

                    <small>

                        ${article.date||""}

                    </small>

                    <h3>

                        <a href="/posts/?post=${article.path}">

                            ${article.title}

                        </a>

                    </h3>

                    <p>

                        ${article.summary||""}

                    </p>

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
   Front Matter読込
========================== */

async function loadArticleMeta(path){

    const response=

        await fetch(

            `/posts/${path}`

        );

    const markdown=

        await response.text();

    const parsed=

        parseFrontMatter(
            markdown
        );

    return{

        path,
        ...parsed.attributes

    };

}


/* ==========================
   Front Matter解析
========================== */

function parseFrontMatter(markdown){

    const match=

        markdown.match(

            /^---([\s\S]*?)---([\s\S]*)$/

        );

    if(!match){

        return{

            attributes:{}

        };

    }

    const yaml=

        match[1];

    const attributes={};

    yaml.split("\n")

    .forEach(line=>{

        const parts=

            line.split(":");

        if(parts.length<2){

            return;

        }

        const key=

            parts[0]
            .trim();

        const value=

            parts
            .slice(1)
            .join(":")
            .trim();

        attributes[key]=
            value;

    });

    return{

        attributes

    };

}
