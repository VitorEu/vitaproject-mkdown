import contentService from "@/service/contentService";
import { mkdown_content } from "@prisma/client";
import axios from "axios";

interface IRequest {
    getContentByUUID(uuid: string): Promise<mkdown_content>
}

const getContentByUUID = async(uuid: string): Promise<mkdown_content> => {
    return (await axios.get(`http://localhost:3333/editor/${uuid}`)).data
}

const clientRequest: IRequest = {
    getContentByUUID
}

export default clientRequest;