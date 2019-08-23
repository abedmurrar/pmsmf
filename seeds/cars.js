exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('cars')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('cars').insert([
                { id: 1, manufacturer: 'SEAT', model: 'IBIZA' },
                { id: 2, manufacturer: 'BMW', model: 'E30' },
                { id: 3, manufacturer: 'MERCEDES', model: 'C180' }
            ]);
        });
};
