import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_3HhnoZkZ1UisuGBa6h4DGOmm5kG"];

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
