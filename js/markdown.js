/* ==========================
   記事ページ描画
========================== */

document.addEventListener(

    "DOMContentLoaded",

    async ()=>{


        /* ==========================
           URLパラメータ取得
        ========================== */

        const params=

            new URLSearchParams(

                window.location.search

            );


        const post=

            params.get(

                "post"

            );


        const content=

            document.getElementById(

                "content"

            );


        if(!post){

            content.innerHTML=`

                <p>

                    記事が見つかりません。

                </p>

            `;

            return;

        }


        try{


            /* ==========================
               Markdown取得
            ========================== */

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


            const markdown=

                await response.text();



            /* ==========================
               FrontMatter取得
            ========================== */

            const frontmatter=

                markdown.match(

                    /---([\s\S]*?)---/

                );


            let title="Untitled";

            let date="";

            let category="";


            if(frontmatter){

                const meta=

                    frontmatter[1];


                title=

                    meta.match(

                        /title:\s*(.+)/

                    )?.[1]

                    ||

                    "Untitled";


                date=

                    meta.match(

                        /date:\s*(.+)/

                    )?.[1]

                    ||

                    "";


                category=

                    meta.match(

                        /category:\s*(.+)/

                    )?.[1]

                    ||

                    "";

            }



            /* ==========================
               FrontMatter除去
            ========================== */

            const body=

                markdown.replace(

                    /---[\s\S]*?---/,

                    ""

                );



            /* ==========================
               HTMLへ反映
            ========================== */

            document.title=

                `${title} | Sairy Hub`;


            document.getElementById(

                "page-title"

            ).textContent=

                title;


            document.getElementById(

                "post-title"

            ).textContent=

                title;


            document.getElementById(

                "post-date"

            ).textContent=

                date;


            document.getElementById(

                "post-category"

            ).textContent=

                category;


            content.innerHTML=

                marked.parse(

                    body

                );

        }

        catch(error){

            console.error(

                error

            );

            content.innerHTML=`

                <p>

                    記事を読み込めませんでした。

                </p>

            `;

        }

    }

);
