'use client'
import { loadingAtom } from "@/atoms/loading-atom";
import { useRecoilValue } from "recoil";

export default function LoadingSpinner() {

    const loading = useRecoilValue(loadingAtom);

    return (
        <>
            {loading && <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-background bg-opacity-50 z-50">
                <div className="flex justify-center items-center space-y-4 flex-col">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                <span className="p-4 font-bold text-2xl">Check your internet connection...</span>
                </div>
            </div>}
        </>
    );
}
