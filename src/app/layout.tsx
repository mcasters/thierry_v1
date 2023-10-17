import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'

import Layout from '@/components/layout-components/Layout'
import { Providers } from './context/providers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import '@/styles/globals.css'
import { getContentsFull } from '@/app/api/content/getContents'
import { getPaintingCategoriesForMenu } from '@/app/api/peinture/category/getCategories'
import { getSculptureCategoriesForMenu } from '@/app/api/sculpture/category/getCategories'
import { getIntro } from '@/utils/commonUtils'

export const metadata: Metadata = {
    title: 'Home',
    description: 'Welcome to Next.js',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)
    const contents = await getContentsFull()
    const paintingCategories = await getPaintingCategoriesForMenu()
    const sculptureCategories = await getSculptureCategoriesForMenu()

    return (
        <html lang="fr">
            <body>
                <Providers session={session}>
                    <Layout
                        introduction={getIntro(contents)?.text}
                        paintingCategories={paintingCategories}
                        sculptureCategories={sculptureCategories}
                    >
                        {children}
                    </Layout>
                </Providers>
            </body>
        </html>
    )
}
