type Props = {
  children: React.ReactNode;
};

export const LearnFeedWrapper = ({ children }: Props) => {
  return <div className="bg-[url('/map-path-only.svg')] bg-cover bg-center bg-no-repeat flex-1 relative top-0 pb-10 lg:pt-5">
   
    {children}</div>;
};
