import { Form } from '../models/Form';
import { Domain } from '../models/Domain';

export type MatchedDomainAndForm = {
    domain?: Domain;
    form?: Form;
};

export class DomainResolver {
    url: URL;
    domains: Domain[];

    constructor(url: URL, domains: Domain[]) {
        this.url = url;
        this.domains = domains;
    }

    resolve(): MatchedDomainAndForm {
        const result: MatchedDomainAndForm = {
            domain: null,
            form: null,
        };

        result.domain = this.findDomain(this.domains);

        if (result.domain) {
            result.form = this.findForm(result.domain.forms);
        }

        return result;
    }

    private findDomain(domains: Domain[]): Domain | null {
        for (const domain of domains) {
            if (this.isMatchedHostName(domain)) {
                return domain;
            }
        }

        return null;
    }

    private findForm(forms: Form[]): Form | null {
        for (const form of forms) {
            if (this.isMatchedPathNames(form)) {
                return form;
            }
        }

        return null;
    }

    private isMatchedHostName(domain: Domain): boolean {
        for (const hostName of domain.allowedHostNames) {
            if (this.url.hostname.includes(hostName)) {
                return true;
            }
        }
        return false;
    }

    private isMatchedPathNames(form: Form): boolean {
        for (const pathName of form.allowedPathNames) {
            if (this.url.pathname.includes(pathName)) {
                return true;
            }
        }
        return false;
    }
}
