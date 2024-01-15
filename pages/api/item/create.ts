import type { NextApiResponse } from "next";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";
import auth from "../../../utils/auth";
import { ExtendedNextApiRequestItem, ResMessageType } from "../../../utils/types";

const createItem = async (req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) => {
  try {
    await connectDB();
    await ItemModel.create(req.body);
    return res.status(200).json({ message: "アイテム作成成功" });
  } catch (error) {
    return res.status(400).json({ message: "アイテム作成失敗" });
  }
};

// createItemを実行前に、authを実行する
// authは、トークンの有効性を検証するミドルウェア
export default auth(createItem);
