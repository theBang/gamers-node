const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Player", // Will use table name `category` as default behaviour.
    tableName: "players_3", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "uuid",
            default: () => "gen_random_uuid()"
        },
        nickname: {
            type: "varchar",
            length: 64,
            unique: true,
            nullable: false
        },
        email: {
            type: "varchar",
            length: 320,
            unique: true,
            nullable: false
        },
        registered: {
            type: "integer",
            nullable: false
        },
        status: {
            type: "boolean",
            nullable: false
        }
    }
})