import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import {Player} from "../src/models/player";
import {PlayerActivity} from "../src/models/playerActivity";
import {Round} from "../src/models/round";
import {Session} from "../src/models/session";
import {PlayerSession} from "../src/models/playerSession";
import {expect} from "chai";

describe("Sequelize", () => {

    let sequelize: Sequelize;

    this.timeout = 10000;

    before(async () => {
        const opt: SequelizeOptions = require("../src/resources/test-db.json");
        opt.models = [Player, PlayerActivity, Round, Session, PlayerSession];
        sequelize = new Sequelize(opt);
        await sequelize.query("DROP DATABASE IF EXISTS test");
        await sequelize.query("CREATE DATABASE test");
        await sequelize.close();

        opt.database = "test";
        sequelize = new Sequelize(opt);
        await sequelize.sync({force: true});
    });

    it("Create session", async () => {
        const session = {
            id: 1,
            players: [
                {id: 1, email: "1@gmail.com"},
                {id: 2, email: "2@gmail.com"},
                {id: 3, email: "3@gmail.com"}
            ]
        };
        await Session.createWithPlayers(session);
        const sessionEntity = await Session.findByPk(session.id);
        expect(sessionEntity).not.to.equal(undefined);
        const players = await Player.findAll();
        expect(players.length).to.be.equal(3);
    });

    it("Create round", async () =>{
        const round = {
            id: 1,
            sessionId: 1,
            players: [
                {id: 1, type: "win"},
                {id: 2, type: "draw"},
                {id: 3, type: "loose"}
            ]
        };
        await Round.create(round, {include: [PlayerActivity]});
        const roundEntity = await Round.findByPk(round.id);
        expect(roundEntity).not.to.equal(undefined);
    })
});
