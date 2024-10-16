import { Crawler } from '@/lib/utils/crawler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams

        const keyword = searchParams.get('keyword')
        const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined
        const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined

        if (!keyword) throw 'Keyword is required'

        const products = await Crawler(keyword, minPrice, maxPrice)

        return NextResponse.json({ result: products }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}
