import { POST, createUserSession } from "@/shared/api";

export async function register(formData) {
  const username = formData.get("username") || "";
  const email = formData.get("email") || "";
  const password = formData.get("password") || "";

  try {
    const { data, error } = await POST("/users", {
      user: { email, password, username },
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
    console.error("Registration error:", error);
    return { error, status: 500 };
  }
}
