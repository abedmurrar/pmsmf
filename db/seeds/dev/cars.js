exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('cars')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('cars').insert([
                { id: 1, manufacturer: 'SEAT', model: 'IBIZA', car_class: 'A', push_type: 'Front' },
                { id: 2, manufacturer: 'BMW', model: 'E30', car_class: 'A', push_type: 'REAR' },
                {
                    id: 3,
                    manufacturer: 'MERCEDES',
                    model: 'C180',
                    car_class: 'A',
                    push_type: 'REAR'
                }
            ]);
        });
};
