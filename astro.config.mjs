import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://yurabish.com',
  integrations: [
    starlight({
      title: 'Sairy Hub',
      tableOfContents: false, // 右側の目次を非表示
      pagefind: false,        // 検索バー（Search）を非表示
      pagination: false,      // ページ下部の「前の記事 / 次の記事」リンクを非表示

      // サイドバーの最小構成
      sidebar: [
        {
          label: '記事一覧',
          items: [
            { autogenerate: { directory: ''} }
          ],
        },
      ],
    }),
  ],
});