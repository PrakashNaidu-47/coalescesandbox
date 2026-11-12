export interface UserProfile {
  userId: string;
  username: string;
  rating: number;
  createdAt: number;
}

export class UserModel {
  private static users: Map<string, UserProfile> = new Map();

  public static async findById(userId: string): Promise<UserProfile | null> {
    return this.users.get(userId) || null;
  }

  public static async save(user: UserProfile): Promise<void> {
    this.users.set(user.userId, user);
  }
}
