import type { NextApiResponse } from "next";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";
import { ExtendedNextApiRequestItem, SavedItemDataType, ResMessageType } from "../../../../utils/types";

const deleteItem = async (req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) => {
  try {
    await connectDB();

    // 該当のアイテムデータを取得
    const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id);
    if (!singleItem) return res.status(400).json({ message: "アイテムが存在していないため削除失敗" });
    // アイテムデータにあるemailと、リクエストのemail（トークン内のemail）が一致したら更新する
    // この処理は、他のユーザーが、自分のアイテムを編集できないようにするための処理
    if (singleItem.email === req.body.email) {
      // updateOneの第一引数（idを指定する部分）は直接idを指定するのではなく、
      // {_id: req.query.id} と指定する必要がある
      // 第2引数は更新するデータ（req.body）を指定する
      await ItemModel.deleteOne({ _id: req.query.id });
      return res.status(200).json({ message: "アイテム削除成功" });
    } else {
      throw new Error("");
    }
  } catch (error) {
    return res.status(400).json({ message: "アイテム削除失敗" });
  }

}

export default auth(deleteItem);