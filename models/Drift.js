const BaseModel = require('./BaseModel');
const Rally = require('./Rally');

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
                score_1: { type: 'integer' },
                score_2: { type: 'integer' },
                score_3: { type: 'integer' },
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
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Rally,
                join: {
                    from: 'drift_manage.rally_id',
                    to: 'rallies.id'
                }
            }
        };
    }
}

module.exports = Drift;
