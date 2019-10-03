const BaseModel = require('./BaseModel');

class Speed extends BaseModel {
    static get tableName() {
        return 'speed_manage';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['rally_id', 'driver_id', 'racing_number'],
            properties: {
                rally_id: { type: 'integer' },
                driver_id: { type: 'integer' },
                racing_number: { type: 'integer' },
                time_1: { type: 'string', format: 'time', default: '00:00:00.0' },
                time_2: { type: 'string', format: 'time', default: '00:00:00.0' },
                time_3: { type: 'string', format: 'time', default: '00:00:00.0' },
                best_time: { type: 'string', format: 'time', default: '00:00:00.0' },
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
                    from: 'speed_manage.rally_id',
                    to: 'rallies.id'
                }
            },
            drivers: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: 'Driver',
                join: {
                    from: 'speed_manage.driver_id',
                    to: 'drivers.id'
                }
            }
        };
    }
}

module.exports = Speed;
