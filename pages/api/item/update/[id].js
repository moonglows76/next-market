import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";

const updateItem = async (req, res) => {
  try {
    // DBに接続
    await connectDB();
    // 該当のアイテムデータを取得
    const singleItem = await ItemModel.findById(req.query.id);
    // アイテムデータにあるemailと、リクエストのemail（トークン内のemail）が一致したら更新する
    // この処理は、他のユーザーが、自分のアイテムを編集できないようにするための処理
    if (singleItem.email === req.body.email) {
      // updateOneの第一引数（idを指定する部分）は直接idを指定するのではなく、
      // {_id: req.query.id} と指定する必要がある
      // 第2引数は更新するデータ（req.body）を指定する
      await ItemModel.updateOne({_id: req.query.id}, req.body);
      return res.status(200).json({ message: "アイテム編集成功" });
    } else {
      throw new Error("");
    }
  } catch (error) {
    return res.status(400).json({ message: "アイテム編集失敗" });
  }

}

export default auth(updateItem);