import { BoxesIcon, File, Users } from "lucide-react"

export default function Boxes() {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white shadow-md rounded-lg py-8 p-4 flex justify-between items-center">
                    <div className="flex flex-col gap-4">
                        <Users />
                        <h5 className="text-sm text-gray-500">Users Count</h5>
                    </div>
                    <h3 className="text-2xl font-semibold">102</h3>
                </div>
                <div className="bg-white shadow-md rounded-lg py-8 p-4 flex justify-between items-center">
                    <div className="flex flex-col gap-4">
                        <BoxesIcon />
                        <h5 className="text-sm text-gray-500">Projects Count</h5>
                    </div>
                    <h3 className="text-2xl font-semibold">73</h3>
                </div>
                <div className="bg-white shadow-md rounded-lg py-8 p-4 flex justify-between items-center">
                    <div className="flex flex-col gap-4">
                        <File />
                        <h5 className="text-sm text-gray-500">Tasks Count</h5>
                    </div>
                    <h3 className="text-2xl font-semibold">56</h3>
                </div>
            </div>
        </div>
    );
}