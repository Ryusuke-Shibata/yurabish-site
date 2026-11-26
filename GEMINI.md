# sairy-hub 開発ルール

このワークスペース（`sairy-hub` / Astro + Starlight）で作業する際は、以下のルールを必ず守ること。

- 個人向けWebツールを追加する場合は、原則 `public/tools/<アプリ名>/index.html` に HTML/CSS/JS を 1 ファイル完結で作成する。
- 解説記事を追加する場合は、`src/content/docs/tools/<アプリ名>.md` に Frontmatter 付きで作成する。
- 指示された対象ファイル・対象フォルダ以外の既存記事や設定ファイルは勝手に変更しない。
- 秘密鍵・トークン・ローカル環境固有の機密情報はコードに直書きしない。
