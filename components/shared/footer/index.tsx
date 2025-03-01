import { APP_NAME } from "@/lib/constants";

const Footer = () => {

    const currentYear = new Date().getFullYear()

    return ( 
      <footer className="bg-seagreenextralight border-t">
        <div className="text-sm md:text-base p-5 flex-center text-gray-900">
            {currentYear} {APP_NAME}. All Rights Reserved 
        </div>
      </footer>
    )
}
 
export default Footer;