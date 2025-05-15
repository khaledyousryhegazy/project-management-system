"use client"
import Image from "next/image";
import { sidebarData } from "@/data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

  const pathname = usePathname()

  return (
    <div className="w-[50px] lg:w-[270px] xl:w-[300px] px-2 ">
      <ul className="flex flex-col  gap-3 pt-20">
        { sidebarData.map( ( item ) => (

          <li key={ item?.id } className={ `${ pathname === item.path ? "bg-[#F0F6FF]" : "" } cursor-pointer transition duration-300 hover:bg-[#F0F6FF] rounded-md` }>
            <Link href={ item?.path } className="flex items-center">
              <Image src={ item?.icon } width={ 42 } height={ 42 } className="min-w-[32px]" alt="Dashboard icon" />
              <h3 className="font-semibold hidden lg:block">{ item?.title }</h3>
            </Link>
          </li>

        ) ) }
      </ul>
    </div>
  );
}
