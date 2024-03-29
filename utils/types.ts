// req型をインポートする
import type { NextApiRequest } from "next";
// MongoDBのIDを扱うための型をインポートする
import { Types } from "mongoose";

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

// リクエストの型を拡張して認証用の型を定義
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
  token?: string; // ?をつけると必須ではなくなる
}

// register.ts, login.ts
// リクエストの型を拡張してユーザー用の型を定義
export interface ExtendNextApiRequestUser extends NextApiRequest {
  body: UserDataType;
}

// login.ts
// MongoDBに保存されたユーザーデータの型を定義
// UserDataTypeに_idを追加するのでextendsを使う
export interface SavedUserDataType extends UserDataType {
  _id: Types.ObjectId;
}

// readAll.ts, [id].ts, update/[id].ts, delete/[id].ts
// MongoDBに保存された商品データの型を定義
// ItemDataTypeに_idを追加するのでextendsを使う
export interface SavedItemDataType extends ItemDataType {
  _id: Types.ObjectId;
}

// readAll.ts
// MongoDBから取得した商品データの型を定義
export interface ResReadAllType {
  message: string;
  allItems?: SavedItemDataType[];
}

// create.ts
export interface ExtendedNextApiRequestItem extends NextApiRequest {
  body: ItemDataType;
}

// [id].ts
export interface ResReadSingleType {
  message: string;
  singleItem?: SavedItemDataType;
}

// Frontend
// [id].tsx, update/[id].tsx, delete/[id].tsx
export interface ReadSingleDataType {
  singleItem: {
    _id: string;
    title: string;
    image: string;
    price: string;
    description: string;
    email: string;
  }
}

// index.tsx
export interface ReadAllDataType {
  allItems: {
    _id: string;
    title: string;
    image: string;
    price: string;
    description: string;
    email: string;
  }[]
}