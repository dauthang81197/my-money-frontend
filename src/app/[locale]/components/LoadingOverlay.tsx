"use client";

export default function LoadingOverlay({isLoading}: { isLoading: boolean }) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
        </div>
    );
}