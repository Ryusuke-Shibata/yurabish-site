/* ==========================
   カテゴリ記事一覧描画
========================== */
async function renderCategory(
    category
){
    const response=
        await fetch(
            "/data/posts.json"
        );
    const posts=
        await response.json();
    const articles=[];

/* ==========================
   各記事読込
========================== */
    for(
        const post
        of posts
    ){
        const article=
            await getPostData(
                post.path
            );
        if(
            article.category===category
        ){
            articles.push(
                article
            );
        }
    }

/* ==========================
   日付順ソート
========================== */
    articles.sort(
        (a,b)=>
        new Date(b.date)
        -
        new Date(a.date)
    );

/* ==========================
   HTML生成
========================== */
    const container=
        document.getElementById(
            "posts"
        );
    container.innerHTML=
        articles.map(
            article=>`
            <article class="article-card">
                <small>
                    ${article.date}
                </small>
                <h3>
                    <a href="/post/?post=${article.path}">
                        ${article.title}
                    </a>
                </h3>
                <p>
                    ${article.summary}
                </p>
            </article>
            `
        ).join("");
}

/* ==========================
   Markdown情報取得
========================== */
async function getPostData(path){
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
        ...parsed.attributes,
        path
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
    const attributes={};
    if(match){
        match[1]
        .split("\n")
        .forEach(line=>{
            const parts=
                line.split(":");
            if(parts.length<2){
                return;
            }
            attributes[
                parts[0].trim()
            ]=
                parts
                .slice(1)
                .join(":")
                .trim()
                .replace(/"/g,"");
        });
    }
    return{
        attributes
    };
}
