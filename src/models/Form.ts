import { ITemplate, Template } from './Template';

export interface IForm {
    id: string;
    title: string;
    allowedPathNames: string[];
    templates: Template[];
}

export class Form implements IForm {
    id: string;
    title: string;
    allowedPathNames: string[];
    templates: Template[];

    constructor(data: IForm) {
        this.fromDb(data);
    }

    fromDb(data: IForm) {
        this.id = data.id;
        this.title = data.title;
        this.allowedPathNames = data.allowedPathNames;
        this.templates = data.templates.map(
            (template: ITemplate) => new Template(template),
        );
    }
}
