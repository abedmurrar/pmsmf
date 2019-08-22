const { Model } = require('objection');
const Driver = require('./Driver');
const Rally = require('./Rally')


class Drift extends Model {

    static get tableName() {
        return 'drift_manage';
    }
    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        return {
            rally: {
                relation: Model.BelongsToOneRelation,
                modelClass: Rally,
                join: {
                    from: 'drift_manage.rally_id',
                    to: 'rallies.id'
                }
            }
        };
    }

}