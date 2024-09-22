import { CustomMdx, MdxPage } from '@features/mdx'
import { Comments } from '@features/mdx/comments'
import { markdownToText } from '@shared/utils'
import { Metadata } from 'next'
import { MDXRemoteProps } from 'next-mdx-remote/rsc'

const exampleSource = `
---
category: TEST
title: TEST
tags: ['TEST', 'TAG']
date: '20240226230000'
thumbnail: https://img.gumyo.net/burn.jpg
---

# MDX Tags Test

This MDX file is for testing the rendering of all common HTML tags.

## Headings

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

## Paragraph

This is a regular paragraph to test text wrapping and basic styles.

## Emphasis

**Bold text**

_Italic text_

~~Strikethrough text~~

**_Bold and Italic text_**

## Blockquote

> This is a blockquote.  
> Multiple lines can be tested here as well.

## Lists

### Unordered List

-   Item 1
-   Item 2
    -   Sub-item 1
    -   Sub-item 2
-   Item 3

### Ordered List

1. First item
2. Second item
    1. Nested first item
    2. Nested second item
3. Third item

## Links

[MDN Web Docs](https://developer.mozilla.org/)
## Images

![MDX Logo](https://img.gumyo.net/anya_hehe.jpg)

## Tables

| Syntax | Description |
| ------ | ----------- |
| Header | Title       |
| Row 1  | Data 1      |
| Row 2  | Data 2      |

## Horizontal Rule

---

## Inline HTML

<p>This paragraph is using raw HTML tags</p>

## Forms

### Input

<label htmlFor='name'>Name:</label>
<input type='text' id='name' name='name' />

### Button

<button type='button'>Click Me!</button>

## Media

### Audio

<audio controls src='https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3' />

### Video

![BUNNY](https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8)

`

export const generateMetadata = async ({ params }: { params: { post: string } }): Promise<Metadata> => {
    const source = (await getPostSource(params.post)) as MDXRemoteProps['source']
    const { frontmatter } = await CustomMdx({ source })
    const context = (markdownToText(source?.toString().slice(0, 250)) || frontmatter.title || '')?.replace(/<\/?[^>]+(>|$)/g, '') + '...'

    return {
        title: {
            template: '%s | HS',
            default: frontmatter.title || 'Article',
        },
        description: context || `Article | ${process.env.SITE_NAME}`,
        keywords: frontmatter.tags?.join(', ') || `Article | ${process.env.SITE_NAME}`,
        openGraph: {
            title: frontmatter.title,
            description: context || `Article | ${process.env.SITE_NAME}`,
            images: [
                {
                    url: `${frontmatter?.thumbnail}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            images: {
                url: `${frontmatter?.thumbnail}`,
                alt: 'Post thumbnail',
            },
            title: frontmatter.title,
            description: context || `Article | ${process.env.SITE_NAME}`,
            creator: process.env.AUTHOR || process.env.SITE_NAME || '',
            creatorId: params.post,
        },
    }
}

const getPostSource = async (postName: string) => {
    try {
        return await exampleSource
    } catch (error) {
        console.error(error)
    }
}

const getCommentList = async (postName: string) => {
    return Promise.resolve([])
}

const manageViewCnt = async (postName: string) => {
    return Promise.resolve('0')
}

const RemoteMdxPage = async ({ params }: { params: { post: string } }) => {
    const source = (await getPostSource(params.post)) as MDXRemoteProps['source']
    const viewCnt = await manageViewCnt(params.post)
    const comments = await getCommentList(params.post)

    const { content, frontmatter } = await CustomMdx({ source })

    return (
        <>
            <MdxPage content={content} frontmatter={{ ...frontmatter, viewCnt }} />
            <Comments comments={comments} post={params.post} />
        </>
    )
}
export default RemoteMdxPage
