import DocumentationTabs from '@/components/DocumentationTabs'
import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finance AI | Documentation',
  description: 'Documentation of app'
}

const Documentation = ({}) => {
  return (
    <div className='container max-w-7xl mx-auto mt-12'>
      <div className="flex flex-col items-center gap-6">
        <LargeHeading>Making a request</LargeHeading>
        <Paragraph>api/v1/similarity</Paragraph>

        <DocumentationTabs />
      </div>
    </div>
  )
}

export default Documentation