import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import { ProductResponse } from './types'

export const Crawler = async (keyword: string, minPrice?: number, maxPrice?: number) => {
    const browser = await puppeteer.launch({
        // args: chromium.args,
        args: process.env.CHROME_LAUNCHER ? ['--no-sandbox', '--headless'] : ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--headless', '--disable-dev-shm-usage'],
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.CHROME_LAUNCHER || (await chromium.executablePath()),
        headless: process.env.CHROME_LAUNCHER ? false : chromium.headless,
    })

    const page = await browser.newPage()

    let url = `https://www.google.com/search?&q=${keyword}&tbm=shop`
    if (minPrice !== undefined && maxPrice !== undefined) url += `&tbs=mr:1,price:1,ppr_min:${minPrice},ppr_max:${maxPrice}`

    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.waitForSelector('.sh-dgr__grid-result')

    const { location, products }: { location: string; products: ProductResponse[] } = await page.evaluate(() => {
        const productContainers = document.querySelectorAll('.sh-dgr__grid-result')
        const location = document.querySelector('div.sh-dr__restricts div[title]')?.getAttribute('title') || ''

        const list = Array.from(productContainers).map((item: any) => {
            // Get the image and product name
            const image = item.querySelector('.sh-dgr__content > div img')?.getAttribute('src')
            const product = item.querySelectorAll('.sh-dgr__content > span [data-sh-gr="line"]')[0]?.innerText || ''

            // Get the spans excluding those with aria-hidden="true"
            const spans = item.querySelectorAll('.sh-dgr__content > span span:not([aria-hidden="true"])')
            const spanTexts = Array.from(spans)
                .map((span: any) => span.innerText)
                .slice(1)

            // Get the price
            const price = item.querySelector('.sh-dgr__offer-content > div > a span[aria-hidden="true"]').innerText?.split(/\s+/)[0]

            // Get the product link
            const href = item?.querySelector('.sh-dgr__offer-content > div > a')?.getAttribute('href')?.replaceAll('/url?url=', '') || ''

            // Get shop name
            const shopName = item?.querySelector('.sh-dgr__offer-content > div > a > div > div:last-child').innerText?.trim()

            return {
                image,
                product,
                otherDetails: spanTexts,
                href,
                price,
                shopName,
            }
        })

        return { location, products: list }
    })

    await browser.close()

    return { location, products }
}
