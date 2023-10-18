type Keys = "accessToken" | "refreshToken";

class StorageService {
  public set(key: Keys, value: string) {
    localStorage.setItem(key, value);
  }

  public get(key: Keys) {
    return localStorage.getItem(key);
  }

  public remove(key: Keys) {
    localStorage.removeItem(key);
  }
}

export const storageService = new StorageService();
