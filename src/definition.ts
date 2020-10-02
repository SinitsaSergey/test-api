export namespace ResponseCode {
    export const SUCCESS = 0;
    export const ERROR_UNKNOWN = 1;
    export const SESSION_EXIST = 2;
    export const SESSION_NOT_EXIST = 2;
    export const ROUND_ID_ALREADY_EXIST = 3;
    export const PLAYER_NOT_EXIST = 4;
}

export const defaultResponseAttributes = {exclude: ["createdAt", "updatedAt"]};
