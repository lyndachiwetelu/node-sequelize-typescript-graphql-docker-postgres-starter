export class Response {
    name: string;
    data: any;
    constructor(name: string, data: any) {
        this.name = name;
        this.data = data;
    }

    static toResponseObject(name: string, data:any) {
        const response = new Response(name, data);
        return {
            __typename: response.name,
            ...response.data
        }
    }
}

export class ErrorResponse {
    name: string;
    message: any;

    private constructor(name: string, data: any) {
        this.name = name;
        this.message = data;
    }

    static toResponseObject(name: string, message: any) {
        const response = new ErrorResponse(name, message);
        return {
            __typename: response.name,
            message: response.message
        }
    }

}