// Types
// Domain entities
export type Encounter = {
  id: number,
  name: string,
  age: number,
  bloodType: string
};

// Commands
export type Command = {
  type: string
};

export type GetAllEncountersCommand = {
  type: string
};

export type GetOneEncounterCommand = {
  type: string,
  id: number
};

export type RemoveEncounterCommand = {
  type: string,
  id: number
};

export type CreateEncounterCommand = {
  type: string,
  encounter: Encounter
};

export type UpdateEncounterCommand = {
  type: string,
  id: number,
  modify: Encounter
};
