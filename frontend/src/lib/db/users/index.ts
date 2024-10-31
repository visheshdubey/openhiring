import prisma from "@/server/db/prisma";

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