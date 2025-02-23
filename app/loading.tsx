import Image from "next/image";
import loader from "@/public/images/loader.gif"

const LoadingPage = () => {
    return ( 
        <div className="flex justify-center items-center h-screen w-screen"
        >
             <Image src={loader}
                    className="h-[50px] w-[50px] 
                               md:h-[70px] md:w-[70px]
                               lg:h-[100px] lg:w-[100px]" 
                    height={80}
                    width={80}
                    alt="Loading..." 
              />
        </div>
     )
}
 
export default LoadingPage;