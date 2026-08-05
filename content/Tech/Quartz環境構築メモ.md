## Quartz ＋ Obsidian でつくるSairy Hub

Sairy Hubの環境構築メモです。
Obsidianで書いたメモを Quartz で静的サイト化し、Cloudflare Pages で公開しています。

---
### 1. 使用しているツール

- **エディタ**: Obsidian（ローカルでMarkdown執筆）
- **SSG**: Quartz v4（MarkdownをHTMLに自動変換）
- **ホスティング**: Cloudflare Pages
- **バージョン管理**: GitHub ＋ GitHub Desktop
- **デザイン**: Custom SCSS

---
## 2. サイト立ち上げ・環境構築の手順

### Step 1: GitHub ・ Quartz の準備と Obsidian との連携
1. Quartz の公式リポジトリ（`jackyzha0/quartz`）を 自身の GitHub に複製。
2. GitHub Desktop から OneDrive の同期フォルダを指定してリポジトリをクローン。
3. その OneDrive フォルダを Obsidian の「保管庫」として開く。

### Step 2: Cloudflare Pages で本番公開
1. Cloudflare から Pages（静的サイトホスティング）を作成。
2. GitHub リポジトリと連携し、自動デプロイを設定。
     - **ビルドコマンド**: `npx quartz build`
     - **出力ディレクトリ**: `public`
3. DNS 設定を行い、カスタムドメインを割り当て。

### Step 3: デザインとレイアウトの調整
1. `.yaml` で2カラム（左サイドバー）レイアウトの指定。
2. `.scss` にスタイル・レイアウトを定義。
3. GitHub Desktop で `Commit` ➔ `Push` して本番への反映を確認。

---

## 3. OneDrive利用の注意点

### 気をつけるべきリスクと対策

#### 1. 同期ラグ
- 複数端末から短時間で編集することによるファイル競合が発生する可能性がある。
- OneDrive の同期が完了する前に Push してしまうと、変更前の古い状態で本番サイトへ反映されてしまう。
#### 2. 同期の通信負荷
- 頻繁に更新されるファイルもあるため、モバイル環境下での同期は通信負荷が高くなる。
### 運用ルール
* **Push権限の一元化**: 本番サイトへの Push は**メインPCからのみ**行う。
* **端末の使い分け**: スマホ・Macでの編集は**「外出時（メインPCを触れない環境）」限定**とし、編集タイミングを完全に分離する。
* **同期対象の限定**: モバイル環境下に同期するのは `content/` 内のノートや画像ファイルのみとし、`.git` フォルダや環境依存ファイルは同期させない。

---
