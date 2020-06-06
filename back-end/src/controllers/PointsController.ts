import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    //função que faz a busca no banco e retorna os dados referente ao id enviado pela requisição
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex(`points`).where(`id`, id).first();

        if(!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }
        
        //faz a consulta retornando os dados referente ao point e os itens relacionados ao point, trazendo apenas o tituto do point
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
            return response.json({ point, items });
        }



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
    
    const trx = await knex.transaction();

    const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
    
        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        })
        await trx('point_items').insert(pointItems);
        await trx.commit();

        
        return response.json({
            id: point_id,
            ...point,
        });

    }
}

export default PointsController;