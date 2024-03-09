import { IMatch } from './IMatch';

export type IMatchModel = { findAll(inProgress: string | undefined): Promise<IMatch[]> };
