import jwt from "jsonwebtoken";

const secret_key = "nextmarket";

// utilsフォルダ内のスクリプトはミドルウェアとして使用することができる
// ミドルウェアとは、APIのリクエストを受け取って、処理を行い、レスポンスを返す関数

// handlerは、pages/api内の関数 createItem, updateItem, deleteItemなど
const auth = (handler) => {
  return async(req, res) => {
    // GETだったら、これ以上処理を進めない
    // return handler(req, res)は、auth.jsの処理を終わらせるコード
    if (req.method === "GET") {
      return handler(req, res)
    }

    console.log(req)

    // POSTだったら、フロントエンドから送られたリクエストのheadersからトークンを取得する
    // req.headers.authorizationに入っている文字列は"Bearer トークンの文字列"となっているので、
    // splitで分割（["Bearer", トークンの文字列]になる）して、トークンの文字列だけ（[0]ではなく[1]）を取得する
    const token = await req.headers.authorization.split(" ")[1];
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vb25nbG93czc2QGdtYWlsLmNvbSIsImlhdCI6MTY5ODU0NDcyNSwiZXhwIjoxNjk4NjI3NTI1fQ.PuP7ipZXU-rIQffy-GbTT0cauqi-4KQ7_af6sDkVop8";

    // トークンがなかったら、認証失敗
    if (!token) {
      return res.status(401).json({ message: "トークンがありません" });
    }

    // トークンがあったら、トークンを検証する
    try {
      // トークンの検証（https://jwt.io/ で検証できるようにトークンとシークレットキーが必要）
      const decoded = jwt.verify(token, secret_key);
      // console.log(decoded);
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