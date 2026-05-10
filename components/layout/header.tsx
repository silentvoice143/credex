"use client"
import React from 'react'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { exportAuditPDF } from '@/libs/utils/export-pdf'

const Header = () => {
    const router = useRouter();
    const pathname = usePathname()
    return (
        <div className='h-16 flex items-center justify-between w-full border-b shadow-sm border-gray-primary px-6 bg-white-primary!'>
            <h1 className='text-black font-bold text-2xl p-2'>Credex</h1>
            {pathname.includes("report") && <Button className='rounded-full px-4 py-2 bg-gray-900' onClick={() => { exportAuditPDF() }}>Export PDF</Button>}
        </div>
    )
}

export default Header