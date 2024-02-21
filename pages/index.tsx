import type { NextPage, GetServerSideProps } from "next";

// import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import { ReadAllDataType } from "../utils/types";

const ReadAllItems: NextPage<ReadAllDataType> = (props) => {
  // const [itemData, setItemData] = useState("");

  // useEffectはレンダリング後に実行される関数
  // クライアントサイドで実行される
  // 第二引数に空の配列を渡すと、初回レンダリング時のみ実行される
  // useEffect(() => {
  //   const getAllData = async () => {
  //     const response = await fetch(
  //       process.env.NEXT_PUBLIC_HOST + "/api/item/readall"
  //     );
  //     const allItems = await response.json();
  //     setItemData(allItems);
  //   };
  //   getAllData();
  // }, []);

  return (
    <div>
      {/* {console.log(itemData)} */}
      <Head>
        <title>Next Market</title>
      </Head>
      <div className="grid-container-in">
        {/* return()の中で{}中括弧を使うとスクリプトが使える */}
        {/* サーバーサイドレンダリング */}
        {/* {props.allItems.map((item) => ( */}
        {/* クライアントサイドレンダリング */}
        {/* {itemData && itemData.allItems.map((item) => ( */}
        {props.allItems.map((item) => (
          <Link href={`/item/${item._id}`} key={item._id} className="card">
            <Image src={item.image} width={750} height={500} alt="item-image" />
            <div className="texts-area">
              <h2>{item.price}</h2>
              <h3>{item.title}</h3>
              <p>{item.description.substring(0, 80)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReadAllItems;

// getServerSidePropsはサーバーサイドで実行される関数
// データ取得用の関数
// export const getServerSideProps = async () => {
//   // fetchはサーバーサイドで実行される
//   // 全アイテムのデータを取得する
//   const response = await fetch(
//     process.env.NEXT_PUBLIC_HOST + "/api/item/readall"
//   );
//   // レスポンスをJSONに変換
//   const allItems = await response.json();

//   // allItemsの中身は { message: '', allItems: [{}, {}, ...] } という形
//   // そのため、JSXでは props.allItems でアイテムの配列にアクセスできる
//   return {
//     props: allItems,
//   };
// };

// getStaticPropsはサーバーサイドで実行される関数
// スタティック・ジェネレーション用の関数
export const getStaticProps: GetServerSideProps<ReadAllDataType> = async () => {
  // fetchはサーバーサイドで実行される
  // 全アイテムのデータを取得する
  const response = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/item/readall"
  );
  // レスポンスをJSONに変換
  const allItems = await response.json();

  // allItemsの中身は { message: '', allItems: [{}, {}, ...] } という形
  // そのため、JSXでは props.allItems でアイテムの配列にアクセスできる
  return {
    props: allItems,
  };
};
