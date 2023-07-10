import { mkdown_content } from "@prisma/client";
import axios from "axios";

interface IRequest {
    getContentByUUID(uuid: string): Promise<mkdown_content>
}

const getContentByUUID = async(uuid: string): Promise<mkdown_content> => {
    return (await axios.get(`http://8be4-186-224-74-25.ngrok-free.app/editor/${uuid}`)).data
}

const clientRequest: IRequest = {
    getContentByUUID
}

export default clientRequest;