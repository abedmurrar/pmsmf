const { Model } = require('objection');
const { DBErrors } = require('objection-db-errors');

class BaseModel extends DBErrors(Model) {
    static get idColumn() {
        return 'id';
    }

    static get modelPaths() {
        return [__dirname];
    }

    static get useLimitInFirst() {
        return true;
    }
}

module.exports = BaseModel;
