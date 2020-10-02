import {Router} from "express";
import {Round} from "../models/round";
import {defaultResponseAttributes, ResponseCode} from "../definition";
import {handleError} from "../error";
import {PlayerActivity} from "../models/playerActivity";

export const statistics = Router();

/**
 * Use to get statistics for player filtered by params
 * e.g. ?id=3&type=win - win stats for player with id = 3
 */
statistics.get("/player", async (req, res) => {
    try {
        const rounds = await Round.findAll({
            include: [{association: "players", where: req.query, attributes: defaultResponseAttributes}],
            attributes: defaultResponseAttributes
        });
        res.status(200).json({
            code: ResponseCode.SUCCESS,
            rounds
        })
    } catch (e) {
        handleError(e, res);
    }
});

/**
 * Use to count all activities for player with specific id
 */
statistics.get("/activities/:id", async (req, res) => {
    try {
        const activityCount = await PlayerActivity.count({where: {id: req.params.id}});
        res.status(200).json({
            code: ResponseCode.SUCCESS,
            count: activityCount
        })
    } catch (e) {
        handleError(e, res);
    }
});
