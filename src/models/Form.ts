import { IInput, Input } from './Input';

export interface IForm {
  id: string;
  title: string;
  urlPatterns: string[],
  inputs: Input[];
}

export class Form implements IForm{
  id: string;
  title: string;
  urlPatterns: string[];
  inputs: Input[];

  constructor(data: IForm) {
    this.fromDb(data);
  }

  fromDb(data: IForm) {
    this.id = data.id;
    this.title = data.title;
    this.urlPatterns = data.urlPatterns;
    this.inputs = data.inputs.map((input: IInput) => new Input(input));
  }
}

