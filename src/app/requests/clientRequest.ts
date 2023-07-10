import { mkdown_content } from "@prisma/client";
import axios from "axios";


interface IRequest {
    getContentByUUID(uuid: string): Promise<mkdown_content>;
    saveContentByUUID(content: string | undefined, uuid: string | undefined): Promise<void>
}

const getContentByUUID = async(uuid: string): Promise<mkdown_content> => {
    return (await axios.get(`https://bcf4-186-224-74-25.ngrok-free.app/editor/${uuid}`)).data
}

const saveContentByUUID = async(content: string | undefined, uuid: string | undefined): Promise<void> => {
    if (!content || !uuid) return;

    const jsonBody = {
        text_content: content,
        uuid: uuid
    } as mkdown_content

    await axios.post(`https://bcf4-186-224-74-25.ngrok-free.app/editor`, jsonBody);
}

const clientRequest: IRequest = {
    getContentByUUID,
    saveContentByUUID
}

export default clientRequest;