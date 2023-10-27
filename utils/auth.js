// utilsフォルダ内のスクリプトはミドルウェアとして使用することができる
// ミドルウェアとは、APIのリクエストを受け取って、処理を行い、レスポンスを返す関数

import jwt from "jsonwebtoken";
const secret_key = "nextmarket";

// handlerは、pages/api内の関数 createItem, updateItem, deleteItemなど
const auth = (handler) => {
  return async(req, res) => {
    // GETだったら、これ以上処理を進めない
    // return handler(req, res)は、auth.jsの処理を終わらせるコード
    if (req.method === "GET") {
      return handler(req, res)
    }
    // POSTだったら、ミドルウェアを実行して、トークンを取得する
    // const token = await req.headers.authorization.split(" ")[1];
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vcmlAY29kaW5nZGVzaWduLmpwIiwiaWF0IjoxNjk4MzcyMTc1LCJleHAiOjE2OTg0NTQ5NzV9.GQbviwBw4nxUp9uCp_kOYH1XWydj1CERD8rh1DHbQ4c";
    // トークンがなかったら、認証失敗
    if (!token) {
      return res.status(401).json({ message: "トークンがありません" });
    }

    // トークンがあったら、トークンを検証する
    try {
      // トークンの検証（https://jwt.io/ で検証できるようにトークンとシークレットキーが必要）
      const decoded = jwt.verify(token, secret_key);
      console.log(decoded);
      // 入力フォームでメールアドレスを入力していなくても、トークンの中にはメールアドレスが入っているため、
      // そのメールアドレスを利用するために、req.body.emailに代入している
      req.body.email = decoded.email;
      // auth.jsの処理を終わらせる
      return handler(req, res)
    } catch (err) {
      return res.status(401).json({ message: "トークンが正しくないので、ログインしてください" });
    }
  }
}

export default auth