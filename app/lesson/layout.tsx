import { auth } from "@clerk/nextjs/server";

type Props = {
  children: React.ReactNode;
};

const LessonLayout = async ({ children }: Props) => {
  const { isAuthenticated, redirectToSignIn } = await auth();
  if (!isAuthenticated) {
    return redirectToSignIn();
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">{children}</div>
    </div>
  );
};

export default LessonLayout;
