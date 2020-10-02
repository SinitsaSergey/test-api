import {Sequelize} from "sequelize-typescript";
import {Player} from "./models/player";
import {PlayerActivity} from "./models/playerActivity";
import {Round} from "./models/round";
import {Session} from "./models/session";
import {PlayerSession} from "./models/playerSession";

export const sequelize = new Sequelize(Object.assign(require("../src/resources/db.json"),
    {
        models: [Player, PlayerActivity, Round, Session, PlayerSession]
    }));
