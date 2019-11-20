export interface IAppControl {
  getType(): string;
}

export enum IAppControlTypes {
  panel = 'panel',
  list = 'list'
}
