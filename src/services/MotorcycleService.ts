import { Motorcycle,
  MotorcycleInterface as MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import Service, { ServiceError } from '.';
import MotorcycleModel from '../models/MotorcycleModel';

type CreateType = Motorcycle | ServiceError | null;

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (obj: Motorcycle): Promise<CreateType> => {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default MotorcycleService;
