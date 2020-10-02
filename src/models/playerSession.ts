import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {Player} from "./player";
import {Session} from "./session";

@Table
export class PlayerSession extends Model<PlayerSession> {

    @ForeignKey(() => Player)
    @Column
    playerId: number;

    @ForeignKey(() => Session)
    @Column
    sessionId: number;

}
