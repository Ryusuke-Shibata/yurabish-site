// ======================
// 記事データ取得
// ======================

async function getPosts(){

  try{

    const res =
      await fetch(
        "/data/posts.json",
        {
          cache:"no-cache"
        }
      );

    if(!res.ok){

      throw new Error(
        "posts.json取得失敗"
      );

    }

    return await res.json();

  }

  catch(error){

    console.error(error);

    return [];

  }

}
