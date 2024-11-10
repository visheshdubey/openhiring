import { getBookmarkedJobList } from "@/lib/db/users"

export const GET = async () => {
    const bookmarks = await getBookmarkedJobList('visheshdubey2016@gmail.com')

    return Response.json({ bookmarks })
}