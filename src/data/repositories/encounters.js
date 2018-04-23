import type { Encounter } from '../../domain/types/encounter';
import type { Repository, Model, Error } from '../../domain/types/common';

export default class Encounters implements Repository<number, Encounter> {
  model: Model<number, Encounter>;
  constructor({ encounterModel }: Object) {
    this.model = encounterModel;
  }

  getAll(): Promise<Array<Encounter>> {
    return this.model.findAll({ order: ['id'] });
  }

  getById(id: number): Promise<Encounter> {
    return this.model.findById(id);
  }

  create(encounter: Encounter): Promise<Encounter> {
    return this.model.create(encounter);
  }

  update(id: number, encounter: Encounter): Promise<any> {
    return this.model
      .update(encounter, {
        where: { id },
        returning: true,
        plain: true,
      })
      .then((result: any) => ((result && result[1] ? result[1] : { error: 'Encounter not found' }): Error))
      .catch(() => ({ error: 'Encounter not found' }: Error));
  }

  delete(id: number): Promise<number> {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}
