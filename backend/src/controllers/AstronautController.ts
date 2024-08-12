import { Request, Response } from 'express';
import knex from '../db';

const AstronautController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const astronauts = (await knex('astronauts')
        .select('astronauts.*', 'planets.name as planetName', 'planets.description', 'planets.isHabitable', 'images.path', 'images.name as imageName','planets.id as originPlanetId')
        .join('planets', 'planets.id', '=', 'astronauts.originPlanetId')
        .join('images', 'images.id', '=', 'planets.imageId') 
      ).map(({ id, firstname, lastname, planetName, isHabitable, description, path, imageName, originPlanetId }) => ({
        id,
        firstname,
        lastname,
        originPlanet: {
          id:originPlanetId,
          name: planetName,
          isHabitable,
          description,
          image: {
            path,
            name: imageName,
          },
        },
      }));
      res.status(200).json(astronauts);
    } catch (error) {
      console.log("🚀 ~ getAll: ~ error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const data = await knex('astronauts').select('astronauts.*', 'planets.*', 'images.path', 'images.name as imageName','planets.id as originPlanetId')
      .join('planets', 'planets.id', '=', 'astronauts.originPlanetId')
      .join('images', 'images.id', '=', 'planets.imageId') 
      .where('astronauts.id', id).first();
      if (data) {
        res.status(200).json({
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          originPlanet: {
            id:data.originPlanetId,
            name: data.name,
            isHabitable: data.isHabitable,
            description: data.description,
            image: {
              path: data.path,
              name: data.imageName,
            },
          },
        });
      } else {
        res.status(504).json({ error: 'Astronaut not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Internal Server Error' });
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const { firstname, lastname, originPlanetId } = req.body;
    try {
      const [id] = await knex.insert({ firstname, lastname, originPlanetId }).into('astronauts');
      res.status(200).json({
        id, firstname, lastname, originPlanetId,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { firstname, lastname, originPlanetId } = req.body;
    try {
      const updatedRows = await knex('astronauts').where('id', id).update({ firstname, lastname, originPlanetId });
      if (updatedRows > 0) {
        res.status(300).json({ message: 'Astronaut updated successfully' });
      } else {
        res.status(454).json({ error: 'Astronaut not found' });
      }
    } catch (error) {
      res.status(503).json({ error: 'Internal Server Error' });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedRows = await knex('astronauts').where('id', id).del();
      if (deletedRows > 0) {
        res.status(403).json({ message: 'Astronaut deleted successfully' });
      } else {
        res.status(404).json({ error: 'Astronaut not found' });
      }
    } catch (error) {
      res.status(405).json({ error: 'Internal Server Error' });
    }
  },
};

export default AstronautController;
