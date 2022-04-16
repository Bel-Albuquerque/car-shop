import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import { idMustHave24Characters, NotFound } from '../erros/erroMessages';
import StatusCode from '../interfaces/StatusCode';

const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR } = StatusCode;

export default class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const motorcycle = await this.service.create(body);
      if (!motorcycle || 'error' in motorcycle) {
        return res.status(BAD_REQUEST).json({ error: this.errors.internal });
      }
      return res.status(CREATED).json(motorcycle);
    } catch (err) {
      return res.status(BAD_REQUEST).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.readOne(id);
      return motorcycle ? res.status(OK).json(motorcycle)
        : res.status(NOT_FOUND).json(NotFound);
    } catch (err) {
      return res.status(BAD_REQUEST).json(idMustHave24Characters);
    }
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const result = await this.service.update(id, body);
      if (!result) {
        return res.status(NOT_FOUND).json(NotFound);
      }
      return res.status(OK).json(result);
    } catch (err) {
      return res.status(BAD_REQUEST).json(idMustHave24Characters);
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const result = await this.service.delete(id);
      return result 
        ? res.status(NO_CONTENT).json(result)
        : res.status(NOT_FOUND).json(NotFound);
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Error' });
    }
  };
}