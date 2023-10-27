import mongoose from "mongoose";

// mongooseに入れるデータ形式（スキーマ）を定義するオブジェクト
const schema = mongoose.Schema;

// mongooseに入れる商品スキーマを定義
const ItemSchema = new schema({
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
});

// mongooseに入れるユーザースキーマを定義
const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 上で作ったスキーマを持つModelを作り、エクスポートする
// モデル … 読み取り、書き込み、更新、削除の処理を行う
export const ItemModel =
  mongoose.models.Item || mongoose.model("Item", ItemSchema);
export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
