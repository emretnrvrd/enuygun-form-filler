import { Template } from '../models/Template';
import { ElementFiller, fillableElement } from './element-filler';
import { Input } from '../models/Input';

export class TemplateFiller {
    private template: Template;
    private foundInputs: Input[];
    private notFoundInputs: Input[];

    constructor(template: Template) {
        this.template = template;
        this.foundInputs = [];
        this.notFoundInputs = [];
    }

    public fillTemplate(): void {
        for (const input of this.template.inputs) {
            this.fillElement(input);
        }
        this.log();
    }

    public submitForm(): void {
        const button: HTMLButtonElement | null = document.querySelector(
            this.template.submit.selector,
        );
        if (button) {
            button.click();
        }
    }

    private async fillElement(input: Input): Promise<void> {
        const foundInput: fillableElement | null = this.findElement(input);
        if (foundInput) {
            new ElementFiller(input, foundInput).fillElement();
        }
    }

    private findElement(input: Input): fillableElement | null {
        let element: fillableElement | null;

        try {
            element = document.querySelector(input.selector);
            if (element) {
                this.foundInputs.push(input);
                return element;
            }
        } catch (error) {
            if (error instanceof DOMException) {
                console.error('Invalid query selector:', input.selector);
                this.notFoundInputs.push(input);
            }
        }

        return null;
    }

    private log(): void {
        console.log(
            'Founded inputs',
            this.foundInputs.map((input) => input.selector),
        );
        console.log([
            'Not founded inputs',
            this.notFoundInputs.map((input) => input.selector),
        ]);
    }
}
