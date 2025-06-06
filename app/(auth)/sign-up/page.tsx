import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./signUpForm";

const SignUpPage = async (props: {
   searchParams: Promise<{
    callbackUrl: string
   }>
}) => {

    const { callbackUrl } = await props.searchParams

    const session = await auth()
    if(session){
        return redirect(callbackUrl || '/')
    }

    return ( 
        <div className="w-full p-7
                        md:max-w-[600px] md:p-5
                        lg:max-w-[700px] lg:p-3">
            <div className="shadow-lg rounded-lg">
            <Card className="bg-[#d3e0d7]">
                <CardHeader className="space-y-4">
                    <Link href="/" className="flex justify-center items-center">
                        <Image src="/images/logo-big.webp"
                               width={100}
                               height={100}
                               alt={`${APP_NAME} logo` }
                               priority={true}  />
                    </Link>
                    <CardTitle className="text-center">Sign Up</CardTitle>
                    <CardDescription className="text-center">
                        Enter your information below to sign up
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SignUpForm />
                </CardContent>
            </Card>
        </div>
        </div>
        
     );
}
 
export default SignUpPage;

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Sign up page"
}

