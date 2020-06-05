import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async create(request: Request, response: Response) {
        const { 
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        // await knex.transaction();
        
        const ids = await knex('points').insert ({
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        });

        // knex('points').insert(point);
    
        // const point_id = insertIds[0];
    
        // const pointItems = items.map((item_id: number) => {
        //     return {
        //         item_id,
        //         point_id,
        //     };
        // })
    
        // await trx('point_items').insert(pointItems);
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id: ids[0],
            }
        })
            await knex('point_items').insert(pointItems);
    
        return response.json({
            // id: point_id,
            // ... point
            success: true
        });
    }
}

export default PointsController;