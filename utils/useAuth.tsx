// useState ログインユーザーのステートを管理するために必要
// useEffect 先行して実行したい処理を記述するために必要
import { useState, useEffect } from "react";
// ページ遷移を行うために必要
import { useRouter } from "next/router";
// トークンの検証に必要
import jwt from "jsonwebtoken";

import { DecodedType } from "./types";

// utils/auth.jsのsecret_keyと同じ文字列
const secret_key = "nextmarket";

// ログインユーザーかどうかを判定するカスタムフック
const useAuth = () => {
  const [loginUser, setLoginUser] = useState("");
  // 　ページ遷移用のオブジェクトのインスタンスを生成
  const router = useRouter();

  // 第2引数に指定した「router」で監視して、ページ遷移するときに実行する
  useEffect(() => {
    // ログインユーザーのtokenを取得
    const token = localStorage.getItem("token");

    // ログインユーザーでなければ、ログインページに遷移
    if (!token) {
      router.push("/user/login");
    }

    try {
      // トークンの検証
      const decoded = jwt.verify(token!, secret_key);
      // トークンの中のメールアドレスをloginUserステートに保存
      setLoginUser((decoded as DecodedType).email);
    } catch (err) {
      // トークンが正しくない場合は、ログインページに遷移
      router.push("/user/login");
    }
  }, [router]);

  // このファイルを処理した結果（ログインユーザーのメールアドレス）を
  // 他のファイルで使用するために、returnで返す
  return loginUser;
};
export default useAuth;
