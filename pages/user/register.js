import { useState } from "react";
import Head from "next/head";

const Register = () => {
  // 名前を格納するstate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(name);

  // APPENDIX: 複数のstateをまとめる場合
  // const [newUser, setNewUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  // const handleChange = (e) => {
  //   setNewUser({ ...newUser, [e.target.name]: e.target.value });
  // };

  // フォームが送信された時の処理
  const handleSubmit = async (e) => {
    // ページ遷移を防ぐ
    e.preventDefault();
    // フォームの値をJSONに変換して送信
    try {
      const response = await fetch(
        "https://next-market-rho.vercel.app/api/user/register",
        {
          // POSTで送信する
          method: "POST",
          // ヘッダーにJSON形式のデータを含める
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // フォームの値をJSONに変換して送信
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
          // APPENDIX: 複数のstateをまとめる場合
          // body: JSON.stringify(newUser),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (err) {
      alert("ユーザー登録失敗");
    }
  };

  return (
    <div>
      <Head>
        <title>ユーザー登録</title>
      </Head>
      <h1 className="page-title">ユーザー登録</h1>
      {/* action属性を使わずonSubmit属性を使う */}
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="名前"
          required
        />
        {/* APPENDIX: 複数のstateをまとめる場合
        valueとonChangeを以下のように書き換える。emailとpasswordも同様。
        <input
          value={newUser.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="名前"
          required
        />
        */}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          name="password"
          placeholder="パスワード"
          required
        />
        <button>登録</button>
      </form>
    </div>
  );
};

export default Register;
