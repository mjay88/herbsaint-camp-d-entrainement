type Props = {
  children: React.ReactNode;
};

export const LearnFeedWrapper = ({ children }: Props) => {
  return <div className="bg-cover bg-center bg-no-repeat flex-1 relative lg:top-0 pb-10">
   
    {children}</div>;
};
