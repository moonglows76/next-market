import type { NextPage, GetServerSideProps } from "next";
import Image from "next/image";
import useAuth from "../../../utils/useAuth";
import Head from "next/head";
import { ReadSingleDataType } from "../../../utils/types";

const DeleteItem: NextPage<ReadSingleDataType> = (props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // console.log(props.singleItem._id)
      const response = await fetch(
        process.env.NEXT_PUBLIC_HOST +
          `/api/item/delete/${props.singleItem._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // ログインしているユーザーだけ追加・更新・削除できるようにするため、
            // ユーザー情報を示すtokenをリクエストヘッダーに含める
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (err) {
      // console.log("b")
      alert("アイテム削除失敗");
    }
  };

  // ログインユーザーの検証＆ログインユーザーのメールアドレスを取得
  const loginUser = useAuth();

  // ログインユーザーとアイテムの作成者が一致する場合のみ、アイテム編集フォームを表示する
  if (loginUser === props.singleItem.email) {
    return (
      <div className="delete-page">
        <Head>
          <title>アイテム削除</title>
        </Head>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{props.singleItem.title}</h2>
          <Image
            src={props.singleItem.image}
            width={750}
            height={500}
            alt="item-image"
          />
          <h3>¥{props.singleItem.price}</h3>
          <p>{props.singleItem.description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default DeleteItem;

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
