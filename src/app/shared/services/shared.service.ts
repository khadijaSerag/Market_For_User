import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public items: number = 0;
  constructor() {}

  // Get the value from local storage
  getValue(key: string): any | null {
    return localStorage.getItem(key);
  }

  // Set the value in local storage
  setValue(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  // Remove the value from local storage
  removeValue(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all values from local storage
  clearLocalStorage(): void {
    localStorage.clear();
  }
}
