import '../styles/options.scss';
import DomainRepository from './repositories/DomainRepository';
import { Domain } from './models/Domain';

document.addEventListener('DOMContentLoaded', () => {
    alert(123);
    initOptions();
});

const initOptions = async () => {
    const domainSelect: Element = document.querySelector(
        '#add-form-domain-select',
    );

    domainSelect.addEventListener('change', (e) => {
        alert(e.type);
    });

    const domains: Domain[] = await new DomainRepository().getAll();

    domainSelect.innerHTML = domains
        .map(
            (domain) => `<option value="${domain.id}">${domain.title}</option>`,
        )
        .join();
};
