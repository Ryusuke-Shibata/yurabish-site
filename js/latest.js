/* ==========================
   最新記事表示
========================== */

async function renderLatest(){

    const response = await fetch(

        "/data/posts.json"

    );

    const posts = await response.json();


    const latest=

        posts.sort(

            (a,b)=>

            new Date(b.date)

            -

            new Date(a.date)

        )

        .slice(0,5);


    const container=

        document.getElementById(

            "latest-post"

        );


    container.innerHTML=

        latest.map(

            p=>`

            <article>

                <small>

                    ${p.date}

                </small>

                <h3>

                    <a href="/post/?post=${p.category}/${p.slug}">

                        ${p.title}

                    </a>

                </h3>

            </article>

            `

        )

        .join("");

}


renderLatest();
