const { Model } = require('objection');
const Rally = require('./Rally');

class Speed extends Model {
    static get tableName() {
        return 'speed_manage';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['rally_id', 'driver_id', 'racing_number'],
            properties: {
                rally_id: { type: 'integer' },
                driver_id: { type: 'integer' },
                racing_number: { type: 'integer' },
                time_1: { type: 'string', format: 'time' },
                time_2: { type: 'string', format: 'time' },
                time_3: { type: 'string', format: 'time' },
                best_time: { type: 'string', format: 'time' },
                fouls_1: { type: 'integer' },
                fouls_2: { type: 'integer' },
                fouls_3: { type: 'integer' }
            },
            additionalProperties: false
        };
    }

    static get relationMappings() {
        return {
            rally: {
                relation: Model.BelongsToOneRelation,
                modelClass: Rally,
                join: {
                    from: 'speed_manage.rally_id',
                    to: 'rallies.id'
                }
            }
        };
    }
}

module.exports = Speed;
