import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'

export default function Home() {
  return (
    <main>
      <LargeHeading size={'lg'}>This is a large heading</LargeHeading>
      <Paragraph className='text-red-400' size={'default'}>Paragraph text default red</Paragraph>
      <Paragraph className='text-rose-400' size={'sm'}>Paragraph text small rose</Paragraph>
    </main>
  )
}
