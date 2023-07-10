interface IException {
    RequiredFields(requiredField: string, response: any): any;
}

const RequiredFields = (requiredField: string, response: any) => {
    return response.status(400).json({ message: `${requiredField.trim()} is required` });
}

const Exception: IException = {
    RequiredFields
}

export default Exception;