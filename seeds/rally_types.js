exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('rally_types').del()
        .then(function() {
            // Inserts seed entries
            return knex('rally_types').insert([
                { id: 1, rally_type: 'speed' },
                { id: 2, rally_type: 'drift' },
                { id: 3, rally_type: '4x4' }
            ]);
        });
};