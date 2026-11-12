import { MatchmakingQueueItem } from '../../../shared/types/chess';

export class MatchmakingService {
  private queue: MatchmakingQueueItem[] = [];

  public enqueue(item: MatchmakingQueueItem): void {
    this.queue.push(item);
    this.queue.sort((a, b) => a.joinedAt - b.joinedAt);
  }

  public dequeue(userId: string): void {
    this.queue = this.queue.filter(item => item.userId !== userId);
  }

  public findMatch(): [MatchmakingQueueItem, MatchmakingQueueItem] | null {
    if (this.queue.length >= 2) {
      const p1 = this.queue.shift()!;
      const p2 = this.queue.shift()!;
      return [p1, p2];
    }
    return null;
  }
}
