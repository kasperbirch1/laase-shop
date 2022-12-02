import React from 'react'
import Head from 'next/head'
import { imageBuilder } from '@lib/sanity'

const HeadSEO = ({ site = {}, page = {}, schema }) => {
  // set <head> variables
  const siteTitle = site.title

  const siteFavicon = site.seo?.favicon || '/favicon.svg'
  const siteFaviconLegacy = site.seo?.faviconLegacy || '/favicon.ico'
  const siteTouchIcon = site.seo?.touchIcon

  const templateTags = [
    {
      tag: '{{page_title}}',
      value: page.title,
    },
    {
      tag: '{{site_title}}',
      value: siteTitle,
    },
  ]

  const metaTitle = replaceTemplateTags(
    page.seo?.metaTitle || site.seo?.metaTitle,
    templateTags
  )
  const metaDesc = page.seo?.metaDesc || site.seo?.metaDesc

  const shareTitle = replaceTemplateTags(
    page.seo?.shareTitle || site.seo?.shareTitle,
    templateTags
  )
  const shareDesc = page.seo?.shareDesc || site.seo?.shareDesc
  const shareGraphic =
    page.seo?.shareGraphic?.asset || site.seo?.shareGraphic?.asset

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <meta name="format-detection" content="telephone=no" />

      <link rel="icon" href={siteFaviconLegacy} sizes="any" />
      <link preload="true" rel="icon" type="image/svg+xml" href={siteFavicon} />
      <link preload="true" rel="mask-icon" href={siteFavicon} color="#000000" />
      {siteTouchIcon && (
        <link
          rel="apple-touch-icon"
          href={imageBuilder.image(siteTouchIcon).width(192).height(192).url()}
        />
      )}

      <link rel="preconnect" href="https://hull-demo.myshopify.com" />
      <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />

      <title>{metaTitle}</title>
      {metaDesc && <meta name="description" content={metaDesc} />}

      {shareTitle && (
        <>
          <meta property="og:title" content={shareTitle} />
          <meta name="twitter:title" content={shareTitle} />
        </>
      )}

      {shareDesc && (
        <>
          <meta property="og:description" content={shareDesc} />
          <meta name="twitter:description" content={shareDesc} />
        </>
      )}

      {shareGraphic && (
        <>
          <meta
            property="og:image"
            content={imageBuilder
              .image(shareGraphic)
              .width(1200)
              .height(630)
              .url()}
          />
          <meta
            name="twitter:image"
            content={imageBuilder
              .image(shareGraphic)
              .width(1200)
              .height(630)
              .url()}
          />
        </>
      )}

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      {siteTitle && <meta property="og:site_name" content={siteTitle} />}

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* PWA */}
      <meta name="application-name" content="PWA App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="PWA App" />
      <meta name="description" content="Best PWA App in the world" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/touch-icon-ipad.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/touch-icon-iphone-retina.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/icons/touch-icon-ipad-retina.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://yourdomain.com" />
      <meta name="twitter:title" content="PWA App" />
      <meta name="twitter:description" content="Best PWA App in the world" />
      <meta
        name="twitter:image"
        content="https://yourdomain.com/icons/android-chrome-192x192.png"
      />
      <meta name="twitter:creator" content="@DavidWShadow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="PWA App" />
      <meta property="og:description" content="Best PWA App in the world" />
      <meta property="og:site_name" content="PWA App" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta
        property="og:image"
        content="https://yourdomain.com/icons/apple-touch-icon.png"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_2048.png"
        sizes="2048x2732"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1668.png"
        sizes="1668x2224"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1536.png"
        sizes="1536x2048"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1125.png"
        sizes="1125x2436"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1242.png"
        sizes="1242x2208"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_750.png"
        sizes="750x1334"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_640.png"
        sizes="640x1136"
      />
    </Head>
  )
}

export default HeadSEO

// replace template tags with values
function replaceTemplateTags(string, templateTags = []) {
  let newString = string

  templateTags.map((v) => {
    newString = newString.replace(new RegExp(v.tag, 'g'), v.value)
  })

  return newString
}
