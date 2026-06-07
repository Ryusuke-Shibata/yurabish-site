/* ==========================
   最新記事表示
========================== */
document.addEventListener(
    "DOMContentLoaded",
    async()=>{
        const response=
            await fetch(
                "/data/posts.json"
            );
        const posts=
            await response.json();
        const articles=[];

/* ==========================
   各記事情報取得
========================== */
        for(
            const post
            of posts
        ){
            const article=
                await getPostData(
                    post.path
                );
            articles.push(
                article
            );
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
   最新記事表示
========================== */
        const latest=
            articles[0];
        document.getElementById(
            "latest-post"
        ).innerHTML=
        `
        <article class="article-card">
            <small>
                ${latest.date}
            </small>
            <h3>
                <a href="/post/?post=${latest.path}">
                    ${latest.title}
                </a>
            </h3>
            <p>
                ${latest.summary}
            </p>
        </article>
        `;
    }
);

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
