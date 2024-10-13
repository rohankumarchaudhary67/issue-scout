// src/providers/RecoilProvider.tsx
"use client"; // Ensure this is a client-side component

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface RecoilProviderProps {
    children: ReactNode;
}

const RecoilProvider = ({ children }: RecoilProviderProps) => {
    return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
