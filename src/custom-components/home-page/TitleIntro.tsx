import React from 'react'
import { Button } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'

type Props = {}

export default function TitleIntro({ }: Props) {
  return (
    <div className='p-4 lg:p-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-3/4 lg:-translate-y-1/3 mt-10 lg:mt-0'>
      <div className="text-left">
        <div className="text-3xl mb-4">Invest at the perfect time.</div>
        <div style={{
          fontSize: '1.2rem',
          letterSpacing: '0.1rem',
          fontWeight: 200
        }}>
          By leveraging insights from our network of industry insiders,
          you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.
        </div>
        <div className="mt-3 mb-10">
          <Link href={'about'}>
            <Button className="text-sm mr-3">About us</Button>
          </Link>
        </div>
      </div>
      <div className="mb-10">
        <div className="text-sm font-semibold mt-3 mb-10">Sponsors</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-9 md:gap-6">
          <img src="image/forbes.svg" alt="sponsor 1" className="h-8" />
          <img src="image/techcrunch.svg" alt="sponsor 2" className="h-8" />
          <img src="image/wired.svg" alt="sponsor 3" className="h-8" />
          <img src="image/cnn.svg" alt="sponsor 4" className="h-8" />
          <img src="image/bbc.svg" alt="sponsor 5" className="h-8" />
          <img src="image/cbs.svg" alt="sponsor 6" className="h-8" />
          <img src="image/fastcompany.svg" alt="sponsor 7" className="h-8" />
          <img src="image/huffpost.svg" alt="sponsor 8" className="h-8" />
        </div>
      </div>
    </div>


  )
}