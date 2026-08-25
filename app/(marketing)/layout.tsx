import { auth } from "@clerk/nextjs/server";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
    children: React.ReactNode;
}
const MarketingLayout = async ({children}: Props) => {
//not protected, public route
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MarketingLayout;
