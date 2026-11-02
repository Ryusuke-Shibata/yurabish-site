# AstroとStarlightによるWebサイト構築手順

## 1. 前提条件
以下の環境が用意されていることを確認します。

- Node.js(v18.14.1以上)
- Git
- VS Code
- GitHubアカウント
- Cloudflareアカウント

---

## 2. プロジェクトの作成
ターミナルで以下のコマンドを実行し、AstroおよびStarlightのテンプレートからプロジェクトを作成します。

```bash
npm create astro@latest -- --template starlight
```

コマンド実行時の対話プロンプトには、以下のように回答します。

1. **Where should we create your new project?**: プロジェクトフォルダ名を入力(例: `my-site`)
2. **Install dependencies?**: `Yes`
3. **Initialize a new git repository?**: `Yes`

---

## 3. ディレクトリ構成とコンテンツの配置
作成されたプロジェクトフォルダへ移動し、VS Codeで開きます。

```bash
cd my-site
code .
```

ドキュメントファイルは`src/content/docs/`配下に格納します。初期配置のサンプルファイルを整理し、必要なMarkdownファイルを配置します。

### トップページファイル例(`src/content/docs/index.md`)
```markdown
---
title: サイトタイトル
description: サイトの概要説明
---

本文テキストをここに記述します。
```

---

## 4. 基本設定
プロジェクト直下の`astro.config.mjs`を編集し、サイトの基本情報とドメインを設定します。

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    starlight({
      title: 'サイトタイトル',
      sidebar: [
        { label: 'About', slug: 'about' },
      ],
    }),
  ],
});
```

---

## 5. ローカルでの動作確認
VS Codeのターミナルで開発用サーバーを起動し、表示を確認します。

```bash
npm run dev
```

ターミナルに表示されたURL(例: `http://localhost:4321`)へブラウザでアクセスして動作を確認します。確認後は`Ctrl + C`でサーバーを停止します。

---

## 6. GitHubリポジトリへのPush
1. GitHub上で空の新しいリポジトリを作成します。
2. VS Codeのターミナルで以下のコマンドを実行し、コードをリモートリポジトリに送信します。

```bash
git remote add origin https://github.com/username/repository-name.git
git branch -M main
git add .
git commit -m "feat: initial commit"
git push -u origin main
```

---

## 7. Cloudflare Pagesへのデプロイ
1. Cloudflareダッシュボードにログインし、**Workers & Pages**を選択します。
2. **Create application**から**Pages**を選択し、**Connect to Git**をクリックします。
3. 対象のGitHubリポジトリを選択し、以下のビルド設定を指定します。

- **Framework preset**: `Astro`
- **Build command**: `npm run build`
- **Build output directory**: `dist`

4. **Save and Deploy**を実行して本番デプロイを行います。

---

## 8. 日常の運用ワークフロー
環境構築完了後の日常的な更新手順は以下の通りです。

1. `src/content/docs/`配下でMarkdownファイルを編集・追加します。
2. VS CodeのターミナルでコミットおよびPushを行います。
   ```bash
   git commit -am "update content"
   git push
   ```
3. Cloudflare Pagesにより、自動でビルドおよびデプロイが実行されます。