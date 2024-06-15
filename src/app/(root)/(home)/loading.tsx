import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <section>
        <h1 className='text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900'>All Questions</h1>
        <div className="mb-12 mt-11 flex flex-wrap gap-5">
            <Skeleton className='h-14 flex-1' />
            
        </div>
        <div className="flex flex-col gap-4">
            {Array.from({length:10}).map((item,i)=>(
                <Skeleton key={i} className="h-60 w-full rounded-2xl"/>
            ))}
        </div>
    </section>
  )
}

export default Loading