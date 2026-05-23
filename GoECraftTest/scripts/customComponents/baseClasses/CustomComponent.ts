const namespace = "fruit_simulator";

export abstract class CustomComponent {
  public getFullId(): string {
    return `${namespace}:${this.getId()}`;
  }

  abstract getId(): string;
}
