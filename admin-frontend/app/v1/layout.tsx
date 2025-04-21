import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout( { children }: { children: React.ReactNode } ) {
    return (
        <div>
            <Navbar />
            <div className="flex gap-5 h-full min-h-screen ">
                <Sidebar />
                <main className="container bg-[#F0F6FF] pt-20">

                    { children }
                </main>
            </div>


        </div>
    );
}