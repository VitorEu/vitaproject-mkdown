import contentService from "../service/contentService";
import Exception from "../exception/exceptionHandler";

interface ContentHandler {
    saveContent(request: any, response: any): any;
    getContent(request: any, response: any): any;
}

const saveContent = async (request: any, response: any) => {
    try {
        const { body } = request;
        console.log(
            `[POST] ${JSON.stringify(body)}`
        )

        if (!body.uuid) return Exception.RequiredFields("uuid", response);

        const result = await contentService.saveContent(body);

        return response.status(201).json(result)
    } catch (ex) {
        throw ex
    }
}

const getContent = async (request: any, response: any) => {
    try {
        const uuid = request.params.uuid;

        if (!uuid) return Exception.RequiredFields("uuid", response);

        const result = await contentService.getContent(uuid);

        return response.status(200).json(result);
    } catch (ex) {
        throw ex
    }
}

const contentHandler: ContentHandler = {
    saveContent,
    getContent
}

export default contentHandler;