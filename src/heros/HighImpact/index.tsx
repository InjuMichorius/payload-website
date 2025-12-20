'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  // Helper to check if media is a video
  const isVideo = (media: any) => media?.mime?.startsWith('video/')

  const getMediaUrl = (media: any) => {
    if (!media) return ''
    // check if it's a video
    if (media.mime?.startsWith('video/')) {
      // construct full API URL for video
      return `${window.location.origin}/api/media/file/${encodeURIComponent(media.filename)}`
    }
    // fallback: image handled by Media component
    return ''
  }

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white pt-8 min-h-[80vh]"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-start">
        <div className="max-w-[32rem]">
          {richText && <RichText className="mb-16" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-start gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {media && typeof media === 'object' && (
        <>
          {media && typeof media === 'object' && (
            <>
              {isVideo(media) ? (
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={getMediaUrl(media)}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <Media
                  fill
                  imgClassName="absolute top-0 left-0 object-cover"
                  priority
                  resource={media}
                />
              )}
            </>
          )}
        </>
      )}

      <div className="absolute inset-0 bg-black/60"></div>
    </div>
  )
}
