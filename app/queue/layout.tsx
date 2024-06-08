import React from 'react'

import { SocketWrapper } from '../socketContext'

export default function QueueLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return <SocketWrapper>{children}</SocketWrapper>
}
