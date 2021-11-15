export class Utils {
  public static getDateInFuture(hours: number): Date {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    return date;
  }
}
