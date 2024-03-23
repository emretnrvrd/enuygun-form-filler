import { Form } from '../models/Form';
import { Domain } from '../models/Domain';

export default class FormResolver {
  url: URL;
  domains: Domain[];

  constructor(url: URL, domains: Domain[]) {
    this.url = url;
    this.domains = domains;
  }

  getRefUrl (): string {
    return this.url.origin + this.url.pathname;
  }

  resolve (): Form | null {
    for (const domain of this.domains) {
      for (const form of domain.forms) {
        if (form.urlPatterns.includes(this.getRefUrl())) {
          return form;
        }
      }
    }
    return null;
  }
}