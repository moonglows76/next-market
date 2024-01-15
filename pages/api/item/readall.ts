import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";
import { SavedItemDataType, ResReadAllType } from "../../../utils/types";

// レスポンスはメッセージと全てのアイテムの配列なのでResReadAllTypeを使う
const getAllItems = async (req: NextApiRequest, res: NextApiResponse<ResReadAllType>) => {
  try {
    await connectDB();
    // 型定義は最後に[]を付けて配列にする
    const allItems: SavedItemDataType[] = await ItemModel.find();
    return res
      .status(200)
      .json({ message: "アイテム読み取り成功（オール）", allItems: allItems });
  } catch (error) {
    return res.status(400).json({ message: "アイテム読み取り失敗（オール）" });
  }
};

export default getAllItems;
