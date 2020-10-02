import {Router} from "express";
import {Session} from "../models/session";
import {Transaction} from "sequelize";
import {sequelize} from "../sequelize";
import {ResponseCode} from "../definition";
import {handleError} from "../error";

export const session = Router();
let transaction: Transaction;

session.post("/", async (req, res) => {
    try {
        const {body} = req;
        transaction = await sequelize.transaction();
        await Session.createWithPlayers(body, transaction);
        await transaction.commit();
        res.status(201).json({code: ResponseCode.SUCCESS});
    } catch (e) {
        await transaction.rollback();
        handleError(e, res);
    }
});
