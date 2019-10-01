/* eslint-disable max-classes-per-file */
const { Model, QueryBuilder } = require('objection');
const { DBErrors } = require('objection-db-errors');
const moment = require('moment');

const DATETIME_FORMAT = 'YYYY-MM-DD hh:mm:ss';

class DataTableQueryBuilder extends QueryBuilder {
    selectWithPagination(options) {
        // this.modelClass().fetchTableMetadata({ table: 'cars' }).then(columns=>{

        // });
        const { columns = [], order = [], start, length, search, _ } = options;
        let columnsNames = columns.map(column => column.data);
        const eagerColumnNames = columnsNames.filter(column => {
            const isEager = column in this.modelClass().relationMappings;
            if (isEager) {
                columnsNames = columnsNames.filter(e => e !== column);
            }
            return isEager;
        });

        const offset = parseInt(start, 10);
        const eager = `[${eagerColumnNames.join(',')}]`;

        const orders = order.map(orderObj => {
            return { column: columnsNames[orderObj.column], order: orderObj.dir };
        });
        return this.select(columnsNames)
            .skipUndefined()
            .eager(eager)
            .offset(offset)
            .limit(length)
            .range()
            .orderBy(orders)
            .throwIfNotFound();
    }
}

class BaseModel extends DBErrors(Model) {
    $beforeInsert() {
        this.created_at = moment().format(DATETIME_FORMAT);
    }

    $beforeUpdate() {
        this.updated_at = moment().format(DATETIME_FORMAT);
    }

    $afterGet() {
        if (this.created_at) {
            this.created_at = moment(this.created_at).format(DATETIME_FORMAT);
        }
        if (this.updated_at) {
            this.updated_at = moment(this.updated_at).format(DATETIME_FORMAT);
        }
    }

    static get idColumn() {
        return 'id';
    }

    static get modelPaths() {
        return [__dirname];
    }

    static get useLimitInFirst() {
        return true;
    }

    static get QueryBuilder() {
        return DataTableQueryBuilder;
    }
}

module.exports = BaseModel;
