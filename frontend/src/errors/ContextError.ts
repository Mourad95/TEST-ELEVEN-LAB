export class ContextError extends Error {
  public contextName: string;

  constructor(contextName: string, message: string) {
    super(message);
    this.name = "ContextError";
    this.contextName = contextName;
  }
}
