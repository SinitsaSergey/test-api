import {Router} from "express";
import {Round} from "../models/round";
import {PlayerActivity} from "../models/playerActivity";
import {sequelize} from "../sequelize";
import {Transaction} from "sequelize";
import {defaultResponseAttributes, ResponseCode} from "../definition";
import {handleError} from "../error";

export const round = Router();
let transaction: Transaction;

round.post("/", async (req, res) => {
    try {
        transaction = await sequelize.transaction();
        await Round.create(req.body, {include: [PlayerActivity], transaction});
        await transaction.commit();
        res.status(201).json({code: ResponseCode.SUCCESS});
    } catch (e) {
        await transaction.rollback();
        handleError(e, res);
    }
});

/**
 * Get all rounds statistics
 */
round.get("/", async (req, res) => {
    try {
        const result = await Round.findAll({
            include: [{
                association: "players",
                attributes: defaultResponseAttributes
            }],
            attributes: defaultResponseAttributes
        });
        res.status(200).json({
            code: ResponseCode.SUCCESS,
            result
        })
    } catch (e) {
        handleError(e, res);
    }
});
