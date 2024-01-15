import type { NextApiResponse } from "next";
//  ログイン状態を維持する仕組みとして、トークン方式を使用する
// トークンは長い文字列で、ユーザーの情報を暗号化したもの
// jsonwebtokenは、トークンを生成するためのライブラリ
import jwt from "jsonwebtoken";
// jwt.verify() 有効性を検証
// jwt.sign(ペイロード, シークレットキー, 有効期限) トークンを生成
// ペイロードは、トークンに含める情報で、ユーザーのIDなどを含める

import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import { ExtendNextApiRequestUser, SavedUserDataType, ResMessageType } from "../../../utils/types";

const secret_key = "nextmarket";

const loginUser = async (req: ExtendNextApiRequestUser, res: NextApiResponse<ResMessageType>) => {
  try {
    await connectDB();
    // 入力されたメールアドレスを持つユーザーを探す
    const savedUserData: SavedUserDataType | null = await UserModel.findOne({ email: req.body.email });
    if (savedUserData) {
      if (req.body.password === savedUserData.password) {
        // パスワードが正しいときの処理
        const payload = {
          email: req.body.email,
        };
        // トークンの生成
        // 有効期限は23時間
        const token = jwt.sign(payload, secret_key, { expiresIn: "23h" });
        return res
          .status(200)
          .json({ message: "ユーザーログイン成功", token: token });
      } else {
        return res
          .status(400)
          .json({
            message: "ユーザーログイン失敗：パスワードが間違っています",
          });
      }
    } else {
      return res
        .status(400)
        .json({ message: "ユーザーログイン失敗：ユーザー登録をしてください" });
    }
  } catch (error) {
    // console.log("データなし");
    return res.status(400).json({ message: "ユーザーログイン失敗" });
  }
};

export default loginUser;
