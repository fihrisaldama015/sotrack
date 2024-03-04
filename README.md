## Started Code For Next JS

### Dokumentasi

Hubungi mentor untuk mendapatkan link

### Detail Package dan Tools yang digunakan

#### Tools
- Next JS = 13.5.4 (https://nextjs.org/docs)
- MUI (https://mui.com/material-ui/getting-started/)

#### Package
- Axios (https://www.npmjs.com/package/axios)

### Struktur Folder

### API Untuk Testing

https://github.com/typicode/json-server#getting-started

#### Getting Started

```
npm install -g json-server
```

Create a `db.json` file with some data

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

Start JSON Server

```bash
json-server --watch db.json
```

Now if you go to [http://localhost:3000/posts/1](http://localhost:3000/posts/1), you'll get

```json
{ "id": 1, "title": "json-server", "author": "typicode" }

```

You can start JSON Server on other ports with the `--port` flag:

```bash
$ json-server --watch db.json --port 3004
```

### Daftar Perintah

Perintah untuk melakukan developing pada projek

```bash
npm run dev
```

Perintah untuk melakukan build projek sebelum deploy ke production

```bash
npm run build
```

Perintah untuk menjalankan projek yang telah di build

```bash
npm run start
```
