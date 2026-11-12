import { GameState } from '../../shared/types/chess';

export class GameStore {
  private state: GameState | null = null;
  private listeners: ((state: GameState) => void)[] = [];

  public getState(): GameState | null {
    return this.state;
  }

  public setState(newState: GameState): void {
    this.state = newState;
    this.notifyListeners();
  }

  public subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    if (this.state) {
      for (const listener of this.listeners) {
        listener(this.state);
      }
    }
  }
}

export const gameStore = new GameStore();
