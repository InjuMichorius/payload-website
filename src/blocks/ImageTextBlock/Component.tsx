import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import { Check } from 'lucide-react'

interface Button {
  id?: string
  label: string
  url: string
  variant?: 'primary' | 'secondary'
}

interface Feature {
  id?: string | number
  text: string
}

interface ImageTextBlockProps {
  blockId?: string
  image?: { url: string } | string
  title?: string
  description?: string
  features?: Feature[]
  buttons?: Button[]
  reverseLayout?: boolean
  className?: string
  preTitle?: string
}

export const ImageTextBlock: React.FC<ImageTextBlockProps> = ({
  blockId,
  image,
  title,
  description,
  features,
  buttons,
  reverseLayout,
  className,
  preTitle,
}) => {
  const imageUrl = typeof image === 'string' ? image : image?.url

  return (
    <section id={blockId || undefined} className={cn('container mx-auto scroll-mt-24', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* TEXT */}
        <div
          className={cn(
            'flex flex-col gap-6 max-w-xl',
            reverseLayout ? 'lg:order-2' : 'lg:order-1',
          )}
        >
          {preTitle && (
            <span className="inline-block text-sm font-medium text-gray-500">{preTitle}</span>
          )}

          {title && <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{title}</h1>}

          {description && <p className="text-lg text-gray-600">{description}</p>}

          {features && features.length > 0 && (
            <ul className="flex flex-col gap-3 pt-2">
              {features.map((feature, idx) => (
                <li key={feature.id || idx} className="flex items-center gap-3 text-gray-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Check size={16} />
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>
          )}

          {buttons && buttons.length > 0 && (
            <div className="flex gap-4 pt-4">
              {buttons.map((btn) => (
                <a
                  key={btn.id || btn.label}
                  href={btn.url}
                  className={cn(
                    'inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition',
                    btn.variant === 'secondary'
                      ? 'border border-gray-300 text-gray-800 hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-800',
                  )}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* IMAGE */}
        {imageUrl && (
          <div
            className={cn(
              'relative w-full h-[420px] lg:h-[520px]',
              reverseLayout ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <Image
              src={imageUrl}
              alt={title || ''}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default ImageTextBlock
