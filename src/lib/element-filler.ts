import { Input } from '../models/Input';

export type fillableElement =
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement;

export class ElementFiller {
    private input: Input;
    private readonly domElement: fillableElement;

    constructor(input: Input, domElement: fillableElement) {
        this.input = input;
        this.domElement = domElement;
    }

    public async fillElement(): Promise<void> {
        switch (this.domElement.type) {
            case 'checkbox':
            case 'radio':
                await this.setChecked();
                break;
            default:
                await this.setValue();
        }

        await this.fireEvents(this.domElement);
    }

    private async setChecked(): Promise<void> {
        if ('checked' in this.domElement) {
            this.domElement.checked = this.input.is_checked;
        }
    }

    private async setValue(): Promise<void> {
        if ('value' in this.domElement) {
            this.domElement.value = this.input.value;
        }
    }

    private async fireEvents(element: fillableElement): Promise<void> {
        ['change', 'input', 'click', 'blur'].forEach((event) => {
            const changeEvent = new Event(event, {
                bubbles: true,
                cancelable: true,
            });
            element.dispatchEvent(changeEvent);
        });
    }
}
