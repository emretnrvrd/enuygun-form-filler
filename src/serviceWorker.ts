import { initializeStorageWithDefaults } from './storage';
import { ulid } from 'ulidx';

chrome.runtime.onInstalled.addListener(async (): Promise<void> => {
    // Here goes everything you want to execute after extension initialization

    await initializeStorageWithDefaults({
        //example database
        domains: [
            {
                id: 'flight',
                title: 'Flight',
                allowedHostNames: [
                    'enuygun.dev',
                    'enuygun.com',
                    'ucak-bileti.local',
                ],
                forms: [
                    {
                        id: 'rezervasyon',
                        title: 'Rezervasyon Formu',
                        allowedPathNames: ['/rezervasyon/'],
                        templates: [
                            {
                                id: ulid(),
                                title: 'Emre ile Doldur',
                                inputs: [
                                    {
                                        selector: 'input#contact_email',
                                        value: 'emre.tanriverdi@enuygun.com',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input#contact_cellphone',
                                        value: '538 023 6114',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input#firstName_0',
                                        value: 'Emre',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input#lastName_0',
                                        value: 'Tanrıverdi',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'select#birthDateDay_0',
                                        value: '02',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'select#birthDateMonth_0',
                                        value: '12',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'select#birthDateYear_0',
                                        value: '1997',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input.publicId',
                                        value: '37975401242',
                                        is_checked: null,
                                    },
                                    {
                                        selector:
                                            'input.passengerGender[value=F]',
                                        value: 'F',
                                        is_checked: null,
                                    },
                                    {
                                        selector:
                                            'input[data-additional-product="assurance"][value="1"]',
                                        value: null,
                                        is_checked: true,
                                    },
                                    {
                                        selector:
                                            'input[name="support-visible-1"][value="1"]',
                                        value: null,
                                        is_checked: true,
                                    },
                                ],
                                submit: {
                                    selector: 'button#continue-button',
                                },
                            },
                            {
                                id: ulid(),
                                title: 'Buse ile Doldur',
                                inputs: [
                                    {
                                        selector: 'input#contact_email',
                                        value: 'buse.tanriverdi@enuygun.com',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input#contact_cellphone',
                                        value: '538 023 0000',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input#firstName_0',
                                        value: 'Buse',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input#lastName_0',
                                        value: 'Tanrıverdi',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'select#birthDateDay_0',
                                        value: '04',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'select#birthDateMonth_0',
                                        value: '06',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'select#birthDateYear_0',
                                        value: '1998',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input.publicId',
                                        value: '37975401242',
                                        is_checked: null,
                                    },
                                    {
                                        selector:
                                            'input.passengerGender[value=F]',
                                        value: null,
                                        is_checked: true,
                                    },
                                    {
                                        selector:
                                            'input[data-additional-product="assurance"][value="1"]',
                                        value: null,
                                        is_checked: true,
                                    },
                                    {
                                        selector:
                                            'input[name="support-visible-1"][value="1"]',
                                        value: null,
                                        is_checked: true,
                                    },
                                ],
                                submit: {
                                    selector: 'button#continue-button',
                                },
                            },
                        ],
                    },
                    {
                        id: 'odeme',
                        title: 'Ödeme Formu',
                        allowedPathNames: ['/rezervasyon-odeme/'],
                        templates: [
                            {
                                id: ulid(),
                                title: 'Test Kartı',
                                inputs: [
                                    {
                                        selector: 'input[name="cardNumber"]',
                                        value: '4444444444444448',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input[name="cardMonth"]',
                                        value: '12',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input[name="cardYear"]',
                                        value: '2030',
                                        is_checked: null,
                                    },
                                    {
                                        selector: 'input[name="cvcCode"]',
                                        value: '999',
                                        is_checked: null,
                                    },
                                ],
                                submit: {
                                    selector:
                                        'button[data-testid="payment-form-submit-button"]',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    });

    console.log('Extension successfully installed!');
});

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
    for (const [key, value] of Object.entries(changes)) {
        console.log(
            `"${key}" changed from "${value.oldValue}" to "${value.newValue}"`,
        );
    }
});

chrome.runtime.onMessage.addListener(function (message) {
    console.log('service workerdayız');
    if (message.action === 'tickStart') {
        let x = 0;
        setInterval(() => {
            console.log('tick');
            chrome.tabs.sendMessage(message.tabId, { message: `tick ${x++}` });
        }, 1000);
    }
});
