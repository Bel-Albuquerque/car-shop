import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends Controller<Car> {
  private $route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car || 'error' in car) {
        return res.status(400).json({ error: this.errors.internal });
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const recordStore = await this.service.readOne(id);
      return recordStore
        ? res.json(recordStore)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ obj: any }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { obj } = req.body;
      const result = await this.service.update(obj.id, obj);
      if (!result) {
        return res.status(404)
          .json({ error: this.errors.notFound });
      }
      return res.json(result);
    } catch (err) {
      return res.status(500)
        .json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const recordStore = await this.service.delete(id);
      return recordStore
        ? res.json(recordStore)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}