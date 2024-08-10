'use client'

import { useRouter } from "next/navigation";

interface loginbuttonprops {
    children : React.ReactNode
    mode? : "modal"| "redirect"
    asChild? : boolean;
}

export const LoginButton = ({children , mode ='redirect', asChild} : loginbuttonprops) => {
    const router = useRouter()
    const onClick =() => {
        router.push('/auth/login')

    }
    if (mode == 'modal'){
        return (
            <span>to be implemented</span>
        )
    }
    return (
        <span onClick = {onClick} className="cursor-pointer">{children}</span>

    )


}