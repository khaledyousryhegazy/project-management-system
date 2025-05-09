
import { Loader } from "lucide-react"

export const LoadingSpinner = () => {
    return (
        <div className="min-h-[30vh] flex items-center justify-center">
            <Loader className="animate-spin" />
        </div>
    )
}