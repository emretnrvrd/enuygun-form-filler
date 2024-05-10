import '../styles/popup.scss';
import { Domain } from './models/Domain';
import DomainRepository from './repositories/DomainRepository';
import { DomainResolver, MatchedDomainAndForm } from './lib/domain-resolver';
import { getCurrentTab, openSettings } from './lib/helpers';
import { FormBuilder } from './lib/form-builder';


document.addEventListener('DOMContentLoaded', () => {
    initPopup()

});

const executeScript = async () => {
    await chrome.runtime.sendMessage({
        action: 'tickStart',
        tabId: (await getCurrentTab()).id,
    });

    //
    // await chrome.scripting.executeScript({
    //     target: { tabId: tab.id },
    //     func: initPopup
    // });
};

const initPopup = async (): Promise<void> => {
    const tab: chrome.tabs.Tab = await getCurrentTab();
    const domainModels: Domain[] = await new DomainRepository().getAll();

    const matchedDomainAndForm: MatchedDomainAndForm = new DomainResolver(
        new URL(tab.url),
        domainModels,
    ).resolve();

    const formBuilder = new FormBuilder(
        '#main',
        matchedDomainAndForm.form,
        matchedDomainAndForm.domain,
    );

    formBuilder.build();
    formBuilder.apply();
};



