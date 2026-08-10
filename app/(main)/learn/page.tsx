export const instant = false;
import { auth } from "@clerk/nextjs/server";

const LearnPage = async () => {
const {isAuthenticated, redirectToSignIn} = await auth();

if(!isAuthenticated){
    return redirectToSignIn()
}

  return <div>Learn Page</div>;
};

export default LearnPage;
