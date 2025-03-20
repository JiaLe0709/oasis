import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/router"

const BackBtn = () => {

    const router = useRouter()

    return (
        <>
            <div className="">
                <button variant="ghost" onClick={() => {
                    router.push('/app/home')
                }}>
                    <ArrowLeft className="h-5 w-" />
                </button>
            </div>
        </>
    )
}

export default BackBtn