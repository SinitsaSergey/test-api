import {BeforeCreate, BelongsToMany, Column, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Player} from "./player";
import {PlayerSession} from "./playerSession";
import {SessionExistError} from "../error";
import {Transaction} from "sequelize";

@Table
export class Session extends Model<Session> {

    /**
     * PrimaryKey key is overwritten to disallow null values in request
     */
    @PrimaryKey
    @Column
    id: number;

    @BelongsToMany(() => Player, () => PlayerSession)
    players: Player[];

    @BeforeCreate
    static async rejectIfExist(session: Session) {
        if (await this.findByPk(session.id)) {
            throw new SessionExistError();
        }
    }

    static async createWithPlayers(session: any, transaction?: Transaction) {
        const newSession: Session = await Session.create(session, {transaction});
        for (const player of session.players) {
            await Player.findOrCreate({
                where: {
                    id: player.id,
                    email: player.email
                },
                transaction
            });
            await PlayerSession.create({
                playerId: player.id,
                sessionId: newSession.id
            }, {transaction});
        }
    }
}
