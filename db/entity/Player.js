const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Player",
    tableName: "players",
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