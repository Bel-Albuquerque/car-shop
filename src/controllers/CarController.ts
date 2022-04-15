import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/CarService';
import { Car, ICar } from '../interfaces/CarInterface';
import { idMustHave24Characters, NotFound } from '../erros/erroMessages';
import StatusCode from '../interfaces/StatusCode';

const { 
  OK, CREATED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCode;

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
        return res.status(BAD_REQUEST).json({ error: this.errors.internal });
      }
      return res.status(CREATED).json(car);
    } catch (err) {
      return res.status(BAD_REQUEST).json({ error: this.errors.internal });
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
        ? res.status(OK).json(recordStore)
        : res.status(NOT_FOUND)
          .json(NotFound);
    } catch (error) {
      return res.status(BAD_REQUEST)
        .json(idMustHave24Characters);
    }
  };

  update = async (
    req: RequestWithBody<ICar>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const result = await this.service.update(body._id, body);
      if (!result) {
        return res.status(NOT_FOUND)
          .json({ error: this.errors.notFound });
      }
      return res.status(CREATED).json(result);
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR)
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
        ? res.status(CREATED).json(recordStore)
        : res.status(NOT_FOUND).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };
}