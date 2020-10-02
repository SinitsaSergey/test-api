import {BelongsToMany, Column, IsEmail, Model, PrimaryKey, Table} from "sequelize-typescript";
import {PlayerSession} from "./playerSession";
import {Session} from "./session";

@Table
export class Player extends Model<Player> {

    /**
     * PrimaryKey key is overwritten to disallow null values in request
     */
    @PrimaryKey
    @Column
    id: number;

    @IsEmail
    @Column
    email: string;

    @BelongsToMany(() => Session, () => PlayerSession)
    sessions: Session[];
}
