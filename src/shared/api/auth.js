import Cookies from "js-cookie";
import { useRouter } from "vue-router";

// 環境変数を利用
const SESSION_SECRET = import.meta.env.VITE_SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set for authentication to work");
}

// ユーザーセッションを作成
export function createUserSession({ user, redirectTo }) {
  Cookies.set("user", JSON.stringify(user), {
    expires: 7, // 7日
    secure: import.meta.env.PROD,
    sameSite: "lax",
  });

  const router = useRouter();
  router.push(redirectTo);
}

// セッションからユーザーを取得
export function getUserFromSession() {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
}

// ユーザーがログインしているか確認
export function requireUser() {
  const user = getUserFromSession();
  if (!user) {
    const router = useRouter();
    router.push("/login");
  }
  return user;
}
