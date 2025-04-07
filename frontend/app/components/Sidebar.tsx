import Image from "next/image";
import { sidebarData } from "../data/data";

export default function Sidebar() {
  return (
    <div className="min-w-[50px] w-full max-w-[250px] px-2">
      <ul className="flex flex-col gap-3 pt-20">
        { sidebarData.map( ( item ) => (

          <li key={ item?.id } className="flex items-center cursor-pointer transition duration-300 hover:bg-[#F0F6FF] rounded-md">
            <Image src={ item?.icon } alt="Dashboard icon" />
            <h3 className="font-semibold">{ item?.title }</h3>
          </li>
        ) ) }

      </ul>
    </div>
  );
}
