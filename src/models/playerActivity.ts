import {AutoIncrement, Column, ForeignKey, Is, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Player} from "./player";
import {Round} from "./round";

@Table
export class PlayerActivity extends Model<PlayerActivity> {

    /**
     * PrimaryKey key is overwritten to use "id" as "playerId"
     */
    @PrimaryKey
    @AutoIncrement
    @Column
    pk: number;

    @ForeignKey(() => Player)
    @Column({field: "playerId"})
    id: number;

    @ForeignKey(() => Round)
    @Column
    roundId: number;

    @Is("win|draw|loose")
    @Column
    type: string;
}
