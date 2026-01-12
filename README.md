# apologize

## devboxで起動方法

### 0. install devbox

`$ curl -fsSL https://get.jetpack.io/devbox | bash`

### 1. open devbox shell

`$ devbox shell`

### 2. build

`$ npm install`

### 3. .env.example を.コピーして.env を作成

.env にバックエンドの URL を記載してください。

```bash
cp .env.example .env
```

### 4. 起動

`$ npm run dev`

## devcontainerで起動方法

### 0. VSCode

VSCodeで[Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) Extensionをインストールする

### 1. devcontainerを立ち上げ

```
vscode上で `cmd + shift + P`
devcontainerのコマンドの `Reopen in Container` を実行
立ち上がるまでしばらく待つ

すべてのインストールが終わったらwindowの再読み込み
vscode上で `cmd + shift + P`
devcontainerのコマンドの `Reload window` を実行
```

### 2. .env.example を.コピーして.env を作成

.env にバックエンドの URL を記載してください。

### 3. 起動

```bash
npm run dev
```

###  Q&A

- commit できない
  - `npx tsc --noEmit` これを実行して、型エラーの対応をしてください。
  - `npm run lint -- --fix` これを実行して、出てきたエラーを消してください。
