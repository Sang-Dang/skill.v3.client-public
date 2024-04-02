import Header from '@/custom-components/Header'
import Tedx2024 from '@/custom-components/event-page/tedx2024/Tedx2024'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
  return (
    <div style={{
      overflowX: 'hidden'
  }}>
      <Header />
      <Tedx2024 />
    </div>
  )
}