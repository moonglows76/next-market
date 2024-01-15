// req型をインポートする
import type { NextApiRequest } from "next";

// next.js内で扱うデータの型を定義
// データの型はスキーマにもモデルにも適用する

// schemaModels.ts
// 商品データの型を定義
export interface ItemDataType {
  title: string;
  image: string;
  price: string;
  description: string;
  email: string;
}

// ユーザーデータの型を定義
export interface UserDataType {
  name: string;
  email: string;
  password: string;
}

// auth.ts
// トークンの中に入っているデータの型を定義
export interface DecodedType {
  email: string;
}

// リクエストの型を拡張した型を定義
export interface ExtendedNextApiRequestAuth extends NextApiRequest {
  headers: {
    authorization: string;
  };
  body: {
    email: string;
  };
}

// Common
export interface ResMessageType {
  message: string;
}
