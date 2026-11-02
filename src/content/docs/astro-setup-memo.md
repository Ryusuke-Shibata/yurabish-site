---
title: Astro(+ Starlight)によるWebサイトの構築メモ
description: Astro StarlightとCloudflare Pagesを使い、VS Code1本で執筆から自動デプロイまで完結する超軽量なWebサイト環境を構築した手順。
---

Astro(+ Starlight)を採用し、Webサイトを構築・公開するまでの手順メモ。

## 1. サイト構成と運用方針

* **SSG (Static Site Generator)**: Astro + Starlightテーマ
* **エディタ & バージョン管理**: VS Code (ターミナル / Source Control)
* **ホスティング**: Cloudflare Pages(完全無料)
* **リポジトリ**: GitHub(`main`ブランチ)
* **独自ドメイン**: `yurabish.com`

---

## 2. プロジェクトの新規作成

作業用フォルダにてCLI コマンドを実行し、Starlight テンプレートでプロジェクトを立ち上げる。

```bash
npm create astro@latest -- --template starlight sairy-hub
cd sairy-hub
```

### 対話プロンプト設定
* **Install dependencies?**: `Yes`
* **Initialize a new git repository?**: `Yes`

---

## 3. コンテンツの配置とフロントマター

`src/content/docs/` ディレクトリ内に Markdown (`.md`) ファイルを配置する。

`src/content/docs/index.md` の記述例:

```markdown
---
title: Sairy Hub
description: 思考のログと、インプットの記録を静かに残す場所。
---

ちょっとずつコンテンツを足していきます。

---

## About
サイトや運営者についての詳細は [About](/about) へ。
```

---

## 4. 設定ファイルの超ミニマル化

`astro.config.mjs` を編集し、検索バーや右側の目次（Table of Contents）、ページ送りナビなどの標準UIパーツを無効化してテキスト主体の構成にする。

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://yurabish.com',
  integrations: [
    starlight({
      title: 'Sairy Hub',
      // 超ミニマル化設定
      tableOfContents: false, // 右側の目次（TOC）を非表示
      pagefind: false,        // 検索バーを非表示
      pagination: false,      // 前後のページ送りナビを非表示

      // サイドバー構造の設定
      sidebar: [
        { label: 'About', slug: 'about' },
      ],
    }),
  ],
});
```

---

## 5. GitHub リポジトリへの接続

VS Code ターミナルから GitHub リポジトリにコードを送信する。

```powershell
git remote add origin https://github.com/ユーザー名/リポジトリ名.git
git branch -M main
git add .
git commit -m "feat: initial commit with Astro Starlight"
git push -u origin main
```

---

## 6. Cloudflare Pages のビルド設定

Cloudflare Pages で GitHub リポジトリと連携し、自動ビルド設定を行う。

### ビルド設定
* **フレームワーク プリセット**: `Astro`
* **ビルドコマンド**: `npm run build`
* **出力ディレクトリ**: `dist`
* **プロダクション ブランチ**: `main`

---

## 7. 日常の執筆ワークフロー

1. **記事作成**: VS Code で `src/content/docs/` 配下に Markdown ファイルを作成・編集。
2. **Push**: VS Code のターミナルからコミット＆Push を実行。
   ```powershell
   git commit -am "add new post"
   git push
   ```
3. **自動反映**: Cloudflare Pages が検知し、約1〜2分で本番サイトへビルド・公開される。