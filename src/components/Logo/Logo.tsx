import Image from 'next/image'
import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps === 'high' ? true : false

  return (
    <Image
      src="/media/logo.svg"
      alt="Payload Logo"
      width={193}
      height={34}
      priority={priority}
      loading={loading}
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
    />
  )
}
