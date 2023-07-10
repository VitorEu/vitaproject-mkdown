'use client'

import { PrismaClient, mkdown_content } from '@prisma/client'

const prisma = new PrismaClient()

interface ContentService {
    saveContent(content: mkdown_content): Promise<mkdown_content>;
    getContent(uuid: string): Promise<mkdown_content>;
}

const saveContent = async (content: mkdown_content): Promise<mkdown_content> => {
    
    await prisma.mkdown_content.deleteMany({
        where: {
            uuid: content.uuid
        }
    });

    const queryResult = await prisma.mkdown_content.create({
        data: {
            uuid: content.uuid,
            text_content: content.text_content
        },
        select: {
            id: true,
            uuid: true,
            text_content: true
        }
    })

    return queryResult
}

const getContent = async (uuid: string): Promise<mkdown_content>  => {
    const queryResult = await prisma.mkdown_content.findFirst({
        select: {
            id: true,
            text_content: true,
            uuid: true
        },
        where: {
            uuid: uuid
        }
    })

    return {
        id: queryResult?.id,
        text_content: queryResult?.text_content,
        uuid: queryResult?.uuid
    } as mkdown_content
}

const contentService: ContentService = {
    saveContent,
    getContent
}

export default contentService;