import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const ReadAllItems = (props) => {
  return (
    <div>
      <Head>
        <title>Next Market</title>
      </Head>
      <div className="grid-container-in">
        {/* return()の中で{}中括弧を使うとスクリプトが使える */}
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
export const getServerSideProps = async () => {
  // fetchはサーバーサイドで実行される
  // 全アイテムのデータを取得する
  const response = await fetch(
    "https://next-market-rho.vercel.app/api/item/readall"
  );
  // レスポンスをJSONに変換
  const allItems = await response.json();

  // allItemsの中身は { message: '', allItems: [{}, {}, ...] } という形
  // そのため、JSXでは props.allItems でアイテムの配列にアクセスできる
  return {
    props: allItems,
  };
};
