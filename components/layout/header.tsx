"use client"
import React from 'react'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter();
    const pathname = usePathname()
    return (
        <div className='h-16 flex items-center justify-between w-full border-b shadow-sm border-gray-primary px-6 bg-white-primary!'>
            <h1 className='text-black font-bold text-2xl p-2'>Credex</h1>

        </div>
    )
}

export default Header