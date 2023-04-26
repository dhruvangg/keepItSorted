import { JSDOM } from 'jsdom'
// http://localhost:3000/api/get-details?url=https://nextjs.org/
export default async function handler(req, res) {
    const { url } = req.query
    try {
        const users = await getData(url)
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export async function getData(url) {
    const response = await fetch(url)
    const jsonData = await response.text()
    const dom = new JSDOM(jsonData)
    const title = dom.window.document.querySelector("meta[property='og:title']").content
    const description = dom.window.document.querySelector("meta[property='og:description']").content
    const image = dom.window.document.querySelector("meta[property='og:image']").content
    return { title, description, image }
}