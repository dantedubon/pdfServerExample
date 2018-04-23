import type {
  Encounter,
  GetOneEncounterCommand,
  RemoveEncounterCommand,
  CreateEncounterCommand,
  UpdateEncounterCommand,
} from '../types/encounter';
import type { CommandHandler, Repository } from '../types/common';

export default class Encounters implements CommandHandler {
  repository: Repository<number, Encounter>;

  constructor({ encountersRepository }: Object) {
    this.repository = encountersRepository;
  }

  getAllEncounters(): Promise<Array<Encounter>> {
    return this.repository.getAll();
  }

  getOneEncounter({ id }: GetOneEncounterCommand): Promise<Encounter> {
    return this.repository.getById(id);
  }

  removeEncounter({ id }: RemoveEncounterCommand) {
    this.repository.delete(id);
  }

  createEncounter({ encounter }: CreateEncounterCommand): Promise<Encounter> {
    return this.repository.create(encounter);
  }

  modifyEncounter({ id, modify }: UpdateEncounterCommand): Promise<Encounter> {
    return this.repository.update(id, modify);
  }
}
