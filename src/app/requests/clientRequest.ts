import { mkdown_content } from "@prisma/client";
import axios from "axios";


interface IRequest {
    getContentByUUID(uuid: string): Promise<mkdown_content>;
    saveContentByUUID(content: string | undefined, uuid: string | undefined): Promise<void>
}

const getContentByUUID = async(uuid: string): Promise<mkdown_content> => {
    return (await axios.get(`http://localhost:3333/editor/${uuid}`)).data
}

const saveContentByUUID = async(content: string | undefined, uuid: string | undefined): Promise<void> => {
    if (!content || !uuid) return;

    const jsonBody = {
        text_content: content,
        uuid: uuid
    } as mkdown_content

    await axios.post(`http://localhost:3333/editor`, jsonBody);
}

const clientRequest: IRequest = {
    getContentByUUID,
    saveContentByUUID
}

export default clientRequest;