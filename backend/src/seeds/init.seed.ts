import { Knex } from 'knex';

export const seed = async (knex: Knex): Promise<void> => {
  await knex('images').del();
  await knex('planets').del();
  await knex('astronauts').del();

  const imagesData = [
    { name: 'Donut Factory Image', path: '/assets/donut_factory.jpg' },
    { name: 'Duck Invaders Image', path: '/assets/duck_invaders.jpg' },
    { name: 'Raccoon from Asgards Image', path: '/assets/raccoon_asgards.jpg' },
    { name: 'Schizo Cats Image', path: '/assets/schizo_cats.jpg' },
  ];

  await knex('images').insert(imagesData);

  const planetsData = [
    { name: 'Donut Factory', description: 'Forte en calories', isHabitable: true, imageId: 1 },
    { name: 'Duck Invaders', description: 'La danse ici est une religion', isHabitable: true, imageId: 2 },
    { name: 'Raccoon from Asgards', description: 'Espiegle mais pas trop', isHabitable: true, imageId: 3 },
    { name: 'Schizo Cats', description: 'Non leur planete n\'est pas une pelote', isHabitable: true, imageId: 4 },
  ];

  await knex('planets').insert(planetsData);

  const astronautsData = [
    { firstname: 'John', lastname: 'Smith', originPlanetId: 1 },
    { firstname: 'Jane', lastname: 'Doe', originPlanetId: 2 },
    { firstname: 'Bob', lastname: 'Johnson', originPlanetId: 3 },
    { firstname: 'Alice', lastname: 'Williams', originPlanetId: 4 },
  ];

  await knex('astronauts').insert(astronautsData);
};

export default seed;
