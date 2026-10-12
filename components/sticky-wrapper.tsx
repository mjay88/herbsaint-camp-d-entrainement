type Props = {
  children: React.ReactNode;
};

export const StickyWrapper = ({ children }: Props) => {
  return (
    // <div className="hidden lg:block w-[368px] sticky self-end bottom-6">
    <div className="hidden lg:flex flex-col w-[368px] p-2 min-h-[calc(100vh-48px)] sticky top-6 gap-y-6">
      {children}
    </div>
    // </div>
  );
};
