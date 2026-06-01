document.addEventListener(

"DOMContentLoaded",

async()=>{

const list=

document.getElementById(
"posts-list"
);

if(!list) return;

const posts=
await getPosts();

list.innerHTML=

posts.map(post=>`

<article class="post-card">

<h2>

<a href="${post.url}">

${post.title}

</a>

</h2>

<p>

${post.summary}

</p>

<small>

${post.date}

</small>

</article>

`).join("");

});
