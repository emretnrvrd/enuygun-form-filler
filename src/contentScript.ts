import { Template } from './models/Template';
import { TemplateFiller } from './lib/template-filler';

chrome.runtime.onMessage.addListener(
    async (
        message,
        messageSender: chrome.runtime.MessageSender,
        sendResponse,
    ): Promise<void> => {
        console.log('content scriptteyiz', message.action);
        if (message.action === 'applyTemplate') {
            await applyTemplate(message, messageSender, sendResponse);
        }
    },
);

const applyTemplate = async (
    message: any,
    messageSender: chrome.runtime.MessageSender,
    sendResponse: any,
): Promise<void> => {
    const templateFiller = new TemplateFiller(
        new Template(message.data.template),
    );
    templateFiller.fillTemplate();
    if (message.data.submit) {
        setTimeout(() => {
            templateFiller.submitForm();
        }, 1000);
    }
};
