import prisma from "@/lib/db/prisma";

export const getBookmarkedJobList = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            bookmarks: true
        }
    })
}