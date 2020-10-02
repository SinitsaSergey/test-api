import {ResponseCode} from "./definition";

class ResponseError extends Error {
    constructor(message, private code: number) {
        super(message);
    }
}

export class SessionExistError extends ResponseError {
    constructor() {
        super("Session already exists", ResponseCode.SESSION_EXIST);
    }
}

export class SessionNotExistError extends ResponseError {
    constructor() {
        super("Session does not exist", ResponseCode.SESSION_NOT_EXIST);
    }
}

export class RoundExistError extends ResponseError {
    constructor() {
        super("Round id already exists", ResponseCode.ROUND_ID_ALREADY_EXIST);
    }
}

export class PlayerNotExistError extends ResponseError {
    constructor() {
        super("Player does not exist", ResponseCode.PLAYER_NOT_EXIST);
    }
}

export function handleError(e, res) {
    console.log(e.message);
    res.status(400).json({
        code: e.code || ResponseCode.ERROR_UNKNOWN,
        message: e.message
    });
}
