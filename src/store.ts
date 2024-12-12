import { load } from "@tauri-apps/plugin-store";

let store: Awaited<ReturnType<typeof load>> | null = null;

// Initialize the store
export async function initializeStore(): Promise<void> {
  if (!store) {
    store = await load("store.json", { autoSave: false });

    // Check if the store is empty and initialize default values
    const hasInitialized = await store.get<boolean>("initialized");
    if (!hasInitialized) {
      await store.set("initialized", true); // Mark store as initialized
      await store.set("settings", { notification: true }); // Default settings
      await store.save();
    }
  }
}

// Get a value from the store
export async function getStoreValue<T>(key: string): Promise<T | undefined> {
  if (!store) throw new Error("Store not initialized!");
  return store.get<T>(key);
}

// Set a value in the store
export async function setStoreValue<T>(key: string, value: T): Promise<void> {
  if (!store) throw new Error("Store not initialized!");
  await store.set(key, value);
  await store.save();
}

// Clear the store (e.g., during logout)
export async function clearStore(): Promise<void> {
  if (!store) throw new Error("Store not initialized!");
  await store.clear();
  await store.save();
}
