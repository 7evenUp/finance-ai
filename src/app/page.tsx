import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Finance AI | Home',
  description: 'Open source Finance AI API'
}

export default function Home() {
  return (
    <main className='relative h-screen flex items-center justify-center overflow-x-hidden'>
      <div className='container pt-32 max-w-7xl mx-auto w-full h-full'>
        <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
          <LargeHeading size={'lg'} className="three-d text-black dark:text-light-gold">
            Easily earn money <br /> with help of AI
          </LargeHeading>
          <Paragraph className='max-w-xl lg:text-left' size={'default'}>
            With Finance AI API you can easily determine good entry points for trades with a free {' '}
            <Link href="/login" className="underline underline-offset-2 text-black dark:text-light-gold">
              API key
            </Link>
            .
          </Paragraph>

          <div className="relative w-full max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute">
            <Image priority className='img-shadow' quality={100} style={{objectFit: 'contain'}} fill src={'/typewriter.png'} alt='typewriter' />
          </div>
        </div>
      </div>
    </main>
  )
}
