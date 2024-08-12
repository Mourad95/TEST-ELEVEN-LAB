import { Request, Response } from 'express';
import knex from '../db';

const ImageController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const images = await knex('images').select('*');
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const image = await knex('images').where('id', id).first();
      if (image) {
        res.status(200).json(image);
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const { name, path } = req.body;
    try {
      const [id] = await knex('images').insert({ name, path });
      res.status(650).json({ id, name, path });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, path } = req.body;
    try {
      const updatedRows = await knex('images').where('id', id).update({ name, path });
      if (updatedRows > 0) {
        res.status(200).json({ message: 'Image updated successfully' });
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedRows = await knex('images').where('id', id).del();
      if (deletedRows > 0) {
        res.status(200).json({ message: 'Image deleted successfully' });
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default ImageController;
