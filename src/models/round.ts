import {BeforeCreate, Column, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Session} from "./session";
import {PlayerActivity} from "./playerActivity";
import {PlayerNotExistError, RoundExistError, SessionNotExistError} from "../error";

@Table
export class Round extends Model<Round> {

    /**
     * PrimaryKey key is overwritten to disallow null values in request
     */
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => Session)
    @Column
    sessionId: number;

    @HasMany(() => PlayerActivity)
    players: PlayerActivity[];

    @BeforeCreate
    static async rejectIfRoundExist(round: Round) {
        if (await this.findByPk(round.id)) {
            throw new RoundExistError();
        }
    }

    @BeforeCreate
    static async rejectIfPlayerOrSessionNotExist(round: Round) {
        const session: Session = await Session.findByPk(round.sessionId, {include: ["players"]});
        if (!session) {
            throw new SessionNotExistError();
        }
        const sessionPlayerIds = session.players.map(player => player.id);
        for (const player of round.players) {
            if (!sessionPlayerIds.includes(player.id)) {
                throw new PlayerNotExistError();
            }
        }
    }
}
