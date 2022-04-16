import { z } from 'zod';
import { VehicleInterface } from './VehicleInterface';

export const MotorcycleInterface = VehicleInterface.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().min(1).max(2500).int(),
});

export type Motorcycle = z.infer<typeof MotorcycleInterface>;
