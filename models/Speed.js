const { Model } = require('objection');
const Rally = require('./Rally');

class Speed extends Model {
    static get tableName() {
        return 'speed_manage';
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
                    from: 'speed_manage.rally_id',
                    to: 'rallies.id'
                }
            }
        };
    }
}

module.exports = Speed;
