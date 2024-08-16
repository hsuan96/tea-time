<p>
This is a personal beverage review desktop application that allows users to record sweetness, ice, and comment on each beverage. This side project is built on Electron React Boilerplate, using Zustand for state management, and SQLite for the database.
</p>

<p>
這是一款紀錄個人飲料評價的桌面應用程式，使用者可以紀錄購買甜度冰塊和心得感想。
這個 side project 使用 Electron React Boilerplate，搭配 Zustand 做狀態管理及使用 SQLite 做為資料庫
</p>
<br>

<img src=".erb/img/demo" />

## Install

Clone the repo and install dependencies:

```bash
git clone https://github.com/hsuan96/tea-time.git your-project-name
cd your-project-name
npm install

cd release/app
npm install
npm run postinstall
cd ../.
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```
