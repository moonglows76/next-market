import type { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import useAuth from "../../../utils/useAuth";
import Head from "next/head";
import { ReadSingleDataType } from "../../../utils/types";

const UpdateItem: NextPage<ReadSingleDataType> = (props) => {
  const [title, setTitle] = useState(props.singleItem.title);
  const [price, setPrice] = useState(props.singleItem.price);
  const [image, setImage] = useState(props.singleItem.image);
  const [description, setDescription] = useState(props.singleItem.description);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // console.log(props.singleItem._id)
      const response = await fetch(
        process.env.NEXT_PUBLIC_HOST +
          `/api/item/update/${props.singleItem._id}`,
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
      // console.log("b")
      alert("アイテム編集失敗");
    }
  };

  // ログインユーザーの検証＆ログインユーザーのメールアドレスを取得
  const loginUser = useAuth();

  // ログインユーザーとアイテムの作成者が一致する場合のみ、アイテム編集フォームを表示する
  if (loginUser === props.singleItem.email) {
    return (
      <div>
        <Head>
          <title>アイテム編集</title>
        </Head>
        <h1 className="page-title">アイテム編集</h1>
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
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            rows={15}
            placeholder="商品説明"
            required
          ></textarea>
          <button>編集</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default UpdateItem;

export const getServerSideProps: GetServerSideProps<
  ReadSingleDataType
> = async (context) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_HOST + `/api/item/${context.query.id}`
  );
  const singleItem = await response.json();
  return {
    props: singleItem,
  };
};
