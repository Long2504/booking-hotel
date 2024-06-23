"use strict";

const StatusCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
};

const ReasonStatusCode = {
    OK: "Success",
    CREATED: "Created",
    NO_CONTENT: "No Content",
};

class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.OK,
        reasonStatusCode = ReasonStatusCode.OK,
        metaData = {},
    }) {
        this.message = !message ? reasonStatusCode : message;
        this.statusCode = statusCode;
        this.reasonStatusCode = reasonStatusCode;
        this.metaData = metaData;
    }

    send(res, header = {}) {
        res.status(this.statusCode).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metaData }) {
        super({
            message,
            metaData,
        });
    }
}

class Created extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.CREATED,
        reasonStatusCode = ReasonStatusCode.CREATED,
        metaData,
    }) {
        super({
            message,
            statusCode,
            reasonStatusCode,
            metaData,
        });
    }
}

export { OK, Created, SuccessResponse };
