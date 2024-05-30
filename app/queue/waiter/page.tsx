import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
export default function page() {
   return (
      <div>
         Start Adding Orders
         <Link href={'/queue/waiter/order'}>
            <Button>Done</Button>
         </Link>
      </div>
   )
}
