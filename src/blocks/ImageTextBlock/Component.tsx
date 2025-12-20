import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

export const ImageTextBlock: React.FC<any> = (props) => {
  const { image, title, description, buttons, reverseLayout, className } = props

  const imageUrl = typeof image === 'string' ? image : image?.url

  if (!imageUrl && !title && !description && (!buttons || buttons.length === 0)) return null

  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn(
          'flex flex-col md:flex-row gap-6 items-center',
          reverseLayout && 'md:flex-row-reverse',
        )}
      >
        {imageUrl && (
          <div className="w-full md:w-1/2 relative h-64 md:h-80">
            <Image
              src={imageUrl}
              alt={title || ''}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}

        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
          {title && <h2 className="text-2xl font-semibold">{title}</h2>}
          {description && <p className="text-base text-gray-700">{description}</p>}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {buttons.map((btn: any) => (
                <a
                  key={btn.id || btn.label}
                  href={btn.url}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageTextBlock
