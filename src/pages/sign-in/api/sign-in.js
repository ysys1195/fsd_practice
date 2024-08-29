import { POST, createUserSession } from "@/shared/api";

export async function signIn(formData) {
  const email = formData.get("email") || "";
  const password = formData.get("password") || "";

  try {
    const { data, error } = await POST("/users/login", {
      user: { email, password },
    });

    if (error) {
      return { error, status: 400 };
    } else {
      return createUserSession({
        user: data.user,
        redirectTo: "/",
      });
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return { error, status: 500 };
  }
}
