export async function getCurrentTab(): Promise<chrome.tabs.Tab> {
    const [tab]: chrome.tabs.Tab[] = await chrome.tabs.query({
        currentWindow: true,
        active: true,
    });
    return tab;
}


export function openSettings (): void {
    chrome.runtime.openOptionsPage();
}