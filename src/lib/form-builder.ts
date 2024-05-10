import { Form } from '../models/Form';
import { Template } from '../models/Template';
import { Domain } from '../models/Domain';
import { getCurrentTab, openSettings } from './helpers';

export class FormBuilder {
    private readonly domQuery: string;
    private form: Form;
    private domain: Domain;
    private result: string;
    private noData: boolean;

    constructor(domQuery: string, form: Form, domain: Domain) {
        this.domQuery = domQuery;
        this.form = form;
        this.domain = domain;
        this.result = '';
        this.noData = true;
    }

    public build() {
        this.decideNoData();

        if (!this.noData) {
            this.buildTitle();
        }

        this.buildContent();
    }

    public apply(): void {
        const el = document.querySelector(this.domQuery);

        if (el) {
            el.innerHTML = this.result;
        } else {
            console.error('Popup element not found!');
        }

        if (!this.noData) {
            this.subscribeTemplateSelection();
        }
    }

    private decideNoData(): void {
        this.noData = !this.form || this.form.templates.length === 0;
    }

    private closeWindow(): void {
        window.close();
    }

    private async subscribeTemplateSelection(): Promise<void> {
        const buttons: NodeListOf<HTMLButtonElement> =
            document.querySelectorAll('.apply-template-btn');
        const submitCheckbox: HTMLInputElement =
            document.querySelector('input#with-submit');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        for (const button of buttons) {
            button.addEventListener('click', () =>
                this.sendApplyMessage(
                    button.getAttribute('data-template-id'),
                    submitCheckbox.checked ?? false,
                ),
            );
        }

        const settingsButton: HTMLElement =
            document.getElementById('go-to-settings');

        settingsButton.addEventListener('click', openSettings);
    }

    private async sendApplyMessage(id: string, submit: boolean): Promise<void> {
        const template = this.form.templates.find(
            (template: Template) => template.id == id,
        );

        if (template) {
            chrome.tabs.sendMessage((await getCurrentTab()).id, {
                action: 'applyTemplate',
                data: {
                    template: template,
                    submit: submit,
                },
            });
            this.closeWindow();
        }
    }

    private buildTitle(): this {
        this.result += `<h6 class="text-white text-center">
      ${this.domain.title} | ${this.form.title}
    </h6>`;

        return this;
    }

    private buildContent(): this {
        let content: string = this.noData
            ? this.createNoData()
            : this.createTemplateList();

        content += this.createSettingsButton();

        this.result += `
      <div class="content-wrapper d-flex justify-content-center align-items-center mb-4">
        ${content}
      </div>
    `;
        return this;
    }

    private createTemplateList(): string {
        const templateButtons: string = this.form.templates
            .map(this.createTemplateButton)
            .join('');
        const submitCheckbox: string = this.createSubmitCheckbox();

        return `<div class="form-list">${
            submitCheckbox + templateButtons
        }</div>`;
    }

    private createNoData(): string {
        return `<div class="no-data text-center">Bu sayfaya uygun template bulunamadı!</div>`;
    }

    private createSubmitCheckbox(): string {
        return `<div class="form-check mb-2">
      <input class="form-check-input" type="checkbox" id="with-submit">
      <label class="form-check-label fs-6" for="with-submit">
        <small>Submit</small>
      </label>
    </div>`;
    }

    private createTemplateButton(template: Template): string {
        return `
      <button 
        type="button" 
        class="apply-template-btn btn btn-outline-light btn-sm w-100 mb-2" 
        data-template-id="${template.id}">
        ${template.title}
      </button>`;
    }

    private createSettingsButton(): string {
        return `
            <a id="go-to-settings">Settings</a>
        `;
    }
}
