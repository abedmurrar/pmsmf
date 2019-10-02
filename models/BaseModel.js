/** @module models/BaseModel */

/* eslint-disable max-classes-per-file */
const { Model, QueryBuilder } = require('objection');
const { DBErrors } = require('objection-db-errors');
const moment = require('moment');

const DATETIME_FORMAT = 'YYYY-MM-DD hh:mm:ss';

class DataTableQueryBuilder extends QueryBuilder {
    async selectWithPagination(options) {
        // Destruct options object from request query
        const { columns = [], order = [], start, length, search, _ } = options;

        // Get table columns names
        const table = await this.modelClass().fetchTableMetadata();

        // Get columns names from options and filter them to existing columns only
        let columnsNames = columns
            .map(column => column.data)
            .filter(column => table.columns.includes(column));

        // Get eager columns and filter them to existing relations only
        const eagerColumnNames = columnsNames.filter(column => {
            const isEager = column in this.modelClass().relationMappings;
            if (isEager) {
                columnsNames = columnsNames.filter(e => e !== column);
            }
            return isEager;
        });

        // Parse offset to Integer type
        const offset = parseInt(start, 10);
        const eager = `[${eagerColumnNames.join(',')}]`;

        // Serialize order for Query
        const orders = order.map(orderObj => {
            return { column: columnsNames[orderObj.column], order: orderObj.dir };
        });

        // Return full query
        return this.select(columnsNames) // select columns
            .skipUndefined() // if a parameter if these functions is undefined it will be skipped
            .eager(eager) // select with relations if requested too
            .offset(offset) // paging
            .limit(length) // paging
            .where('is_active', true) // select un(soft)deleted records
            .range() // return total length
            .orderBy(orders) // order by column
            .throwIfNotFound(); // throws javascript error if no records returned
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
