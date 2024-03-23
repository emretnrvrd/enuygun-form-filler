import StorageArea = chrome.storage.StorageArea;

function storage():StorageArea{
  return chrome.storage.local;
}


// Define your storage data here
export interface Storage {
  [key: string]: any;
} // eslint-disable-line

export function getStorageData(): Promise<Storage> {
  return new Promise((resolve, reject) => {
    storage().get(null, (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      return resolve(result as Storage);
    });
  });
}

export function setStorageData(data: Storage): Promise<void> {
  return new Promise((resolve, reject) => {
    storage().set(data, () => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      return resolve();
    });
  });
}

export function getStorageItem<Key extends keyof Storage>(
  key: Key,
): Promise<Storage[Key]> {
  return new Promise((resolve, reject) => {
    storage().get([key], (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      return resolve((result as Storage)[key]);
    });
  });
}

export function setStorageItem<Key extends keyof Storage>(
  key: Key,
  value: Storage[Key],
): Promise<void> {
  return new Promise((resolve, reject) => {
    storage().set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      return resolve();
    });
  });
}

export async function initializeStorageWithDefaults(defaults: Storage) {
  const currentStorageData = await getStorageData();
  const newStorageData = Object.assign({}, defaults, currentStorageData);
  await setStorageData(newStorageData);
}
