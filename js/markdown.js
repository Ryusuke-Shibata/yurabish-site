/* ==========================
   ページ初期化
========================== */
document.addEventListener(
    "DOMContentLoaded",
    async()=>{
        const params=
            new URLSearchParams(
                window.location.search
            );
        const postPath=
            params.get(
                "post"
            );
        if(!postPath){
            showError(
                "記事が見つかりません"
            );
            return;
        }
        loadPost(
            postPath
        );
    }
);

/* ==========================
   記事読込
========================== */
async function loadPost(path){
    try{
        const response=
            await fetch(
                `/posts/${path}`,
                {
                    cache:"no-cache"
                }
            );
        if(!response.ok){
            throw new Error(
                "記事読込失敗"
            );
        }
        const markdown=
            await response.text();
        const parsed=
            parseFrontMatter(
                markdown
            );
        updateMeta(
            parsed.attributes
        );
        document.getElementById(
            "content"
        ).innerHTML=
            marked.parse(
                parsed.content
            );
    }
    catch(error){
        console.error(
            error
        );
        showError(
            "記事を読み込めませんでした"
        );
    }
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
            attributes:{},
            content:markdown
        };
    }
    const yaml=
        match[1];
    const content=
        match[2];
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
            .trim()
            .replace(/"/g,"");
        attributes[key]=
            value;
    });
    return{
        attributes,
        content
    };
}

/* ==========================
   ページ情報更新
========================== */
function updateMeta(data){
    const title=
        data.title
        ||
        "Untitled";
    document.title=
        `${title} | Sairy Hub`;
    const titleElement=
        document.getElementById(
            "post-title"
        );
    if(titleElement){
        titleElement.textContent=
            title;
    }
    const dateElement=
        document.getElementById(
            "post-date"
        );
    if(
        dateElement &&
        data.date
    ){
        dateElement.textContent=
            data.date;
    }
}

/* ==========================
   エラー表示
========================== */

function showError(message){
    document.getElementById(
        "content"
    ).innerHTML=
        `<p>${message}</p>`;
}
