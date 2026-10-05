type Props = {
  children: React.ReactNode;
};

export const FeedWrapper = ({ children }: Props) => {
  return <div className="bg-[url('/Herbsaint-Map.png')] bg-cover bg-center bg-no-repeat flex-1 relative top-0 pb-10">{children}</div>;
};
