import Navbar from "@/components/global/Navbar";
import Sidebar from "@/components/global/Sidebar";

export default function DashboardLayout( { children }: { children: React.ReactNode } ) {
    return (
        <div>
            <Navbar />
            <div className="flex h-full min-h-screen">
                <Sidebar />
                <main className="bg-[#F0F6FF] pt-20 md:!px-6 w-full">

                    { children }
                </main>
            </div>


        </div>
    );
}