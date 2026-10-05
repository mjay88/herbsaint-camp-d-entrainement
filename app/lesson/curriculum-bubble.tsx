import Image from "next/image";
import { useMedia } from "react-use";

type Props = {
  question: string;
  imageSrc: string | null;
};

export const CurriculumBubble = ({ question, imageSrc }: Props) => {
  const isMobile = useMedia("(max-width: 1024px", true);
  return (
    <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-x-4 gap-y-4 mb-6">
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt="Mascot" //TODO: Fix to appropriate string
            height={300}
            width={300}
            className="hidden lg:block"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          />
        </>
      ) : (
        <>
          <Image
            src="/mascot.svg"
            alt="Mascot"
            height={300}
            width={300}
            className="hidden lg:block"
          />
        </>
      )}

      <div className="relative py-2 px-4 m-3 border-2 rounded-xl text-base text-left whitespace-pre-line">
        <div className="overflow-y-auto max-h-72 lg:max-h-full -mx-3 lg:-mx-0">
          {question}
        </div>
        {!imageSrc && (
          <>
            <div className="absolute hidden lg:block -left-6 top-1/3 w-3 h-3 border-x-[16px] border-x-transparent border-t-16 transform -translate-y-1/2 rotate-90" />
            <div className="absolute block lg:hidden -bottom-4 right-1/3 w-3 h-3 border-x-[16px] border-x-transparent border-t-16 transform -translate-x-1/2" />
          </>
        )}
      </div>

      {imageSrc ? (
        <Image
          src={imageSrc}
          alt="Mascot"
          height={200}
          width={200}
          className="block lg:hidden"
          placeholder="blur"
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        />
      ) : (
        <Image
          src="/mascot.svg"
          alt="Mascot"
          height={200}
          width={200}
          className="block lg:hidden"
        />
      )}
    </div>
  );
};
