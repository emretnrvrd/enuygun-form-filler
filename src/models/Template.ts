import { Input } from './Input';

type Submit = { selector: string };

export interface ITemplate {
    id: string;
    title: string;
    inputs: Input[];
    submit: Submit;
}

export class Template implements ITemplate {
    id: string;
    title: string;
    inputs: Input[];
    submit: Submit;

    constructor(data: ITemplate) {
        this.fromDb(data);
    }

    fromDb(data: ITemplate) {
        this.id = data.id;
        this.title = data.title;
        this.inputs = data.inputs;
        this.submit = data.submit;
    }
}
