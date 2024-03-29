import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import useAuth from "../../utils/useAuth";
import ImgInput from "../../components/ImgInput";

const CreateItem: NextPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_HOST + "/api/item/create",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // ログインしているユーザーだけ追加・更新・削除できるようにするため、
            // ユーザー情報を示すtokenをリクエストヘッダーに含める
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // 文字列をJSON.stringifyでJSONに変換する
          body: JSON.stringify({
            title: title,
            price: price,
            image: image,
            description: description,
          }),
          // 上記は下のように省略できる
          // body: JSON.stringify({ title, price, image, description }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (err) {
      alert("アイテム作成失敗");
    }
  };

  // ログインユーザーの検証＆ログインユーザーのメールアドレスを取得
  const loginUser = useAuth();
  // console.log('loginUser: ', loginUser);

  // ログインユーザーがいる場合のみ、アイテム作成フォームを表示する
  if (loginUser) {
    return (
      <div>
        <Head>
          <title>アイテム作成</title>
        </Head>
        <h1 className="page-title">アイテム作成</h1>
        <ImgInput setImage={setImage} />
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="アイテム名"
            required
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            name="price"
            placeholder="価格"
            required
          />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            name="image"
            placeholder="画像"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            rows={15}
            placeholder="商品説明"
            required
          ></textarea>
          <button>作成</button>
        </form>
      </div>
    );
  } else {
    return <h1>ログインしてください</h1>;
  }
};

export default CreateItem;
