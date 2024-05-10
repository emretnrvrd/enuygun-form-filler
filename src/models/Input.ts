export interface IInput {
    selector: string;
    element_type: string;
    value?: string;
    is_checked?: boolean;
}

export class Input implements IInput {
    selector: string;
    element_type: string;
    value?: string;
    is_checked?: boolean;

    constructor(data: IInput) {
        this.fromDb(data);
    }

    fromDb(data: IInput) {
        this.selector = data.selector;
        this.element_type = data.element_type;
        this.value = data.value;
        this.is_checked = data.is_checked;
    }
}
