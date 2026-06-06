/* ========================================
   記事ページ描画
   URLパラメータからMarkdownを取得して表示
======================================== */

document.addEventListener(

    "DOMContentLoaded",

    async()=>{


        /* ======================
           URLから記事情報取得
        ====================== */

        const params=

            new URLSearchParams(

                window.location.search

            );


        const post=

            params.get(

                "post"

            );


        /* 記事指定がない場合 */

        if(!post){

            showError(

                "記事が見つかりません。"

            );

            return;

        }


        /* ======================
           Markdown取得
        ====================== */

        try{

            const response=

                await fetch(

                    `/posts/${post}.md`,

                    {

                        cache:"no-cache"

                    }

                );


            if(!response.ok){

                throw new Error(

                    "Markdown読込失敗"

                );

            }


            let markdown=

                await response.text();


            /* ======================
               Frontmatter除去
            ====================== */

            markdown=

                markdown.replace(

                    /^---[\s\S]*?---/,

                    ""

                );


            /* ======================
               タイトル取得
            ====================== */

            const title=

                extractTitle(

                    markdown

                );


            /* タイトル表示 */

            if(title){

                document.title=

                    `${title} | SAIRY HUB`;


                document.getElementById(

                    "post-title"

                ).textContent=

                    title;

            }


            /* ======================
               Markdown→HTML変換
            ====================== */

            document.getElementById(

                "content"

            ).innerHTML=

                marked.parse(

                    markdown

                );


        }


        /* ======================
           エラー時
        ====================== */

        catch(error){

            console.error(

                error

            );

            showError(

                "記事を読み込めませんでした。"

            );

        }

    }

);


/* ========================================
   H1からタイトル取得
======================================== */

function extractTitle(

    markdown

){

    const match=

        markdown.match(

            /^#\s+(.+)$/m

        );


    return match

        ? match[1]

        : "Untitled";

}


/* ========================================
   エラー表示
======================================== */

function showError(

    message

){

    document.getElementById(

        "content"

    ).innerHTML=

        `

        <div class="error-box">

            <h2>

                ERROR

            </h2>

            <p>

                ${message}

            </p>

        </div>

        `;

}
