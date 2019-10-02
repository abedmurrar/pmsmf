const BaseModel = require('./BaseModel');

class Drift extends BaseModel {
    static get tableName() {
        return 'drift_manage';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['rally_id', 'driver_id', 'racing_number'],
            properties: {
                rally_id: { type: 'integer' },
                driver_id: { type: 'integer' },
                racing_number: { type: 'integer' },
                score_1: { type: 'integer', default: 0 },
                score_2: { type: 'integer', default: 0 },
                score_3: { type: 'integer', default: 0 },
                fouls_1: { type: 'integer', default: 0 },
                fouls_2: { type: 'integer', default: 0 },
                fouls_3: { type: 'integer', default: 0 },
                is_active: { type: 'boolean', default: true }
            },
            additionalProperties: false
        };
    }

    static get relationMappings() {
        return {
            rally: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: 'Rally',
                join: {
                    from: 'drift_manage.rally_id',
                    to: 'rallies.id'
                }
            }
        };
    }
}

module.exports = Drift;
