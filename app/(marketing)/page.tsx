import { Button } from "@/components/ui/button";
import {
     ClerkLoaded,
  ClerkLoading,
  Show,
  SignInButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs"
import { Loader } from "lucide-react";
import Image from "next/image";

export default function Home() {



  return <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
    <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/garson.svg" fill alt="Hero" />
    </div>
    <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl leg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
            Welcome to Herbsaint d&apos;entrainement!
        </h1>
    <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
     <ClerkLoading>
        <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
     </ClerkLoading>
     <ClerkLoaded>
        <Show when="signed-out">
            <SignUpButton
            mode="modal"
            forceRedirectUrl="/learn"
            //TODO: use environemtn variable instead of props once learn page is created
            signInForceRedirectUrl="/learn"
            >
                <Button size="lg" variant="secondary" className="w-full">
                   SIGN UP
                </Button>
            </SignUpButton>
            <SignInButton
            mode="modal"
            forceRedirectUrl="/learn"
            signUpForceRedirectUrl="/learn"
            >
             <Button size="lg" variant="primaryOutline" className="w-full">
                   I ALREADY HAVE AN ACCOUNT
                </Button>
            </SignInButton>
        </Show>
     </ClerkLoaded>
    </div>
    </div>
  </div>;
}
