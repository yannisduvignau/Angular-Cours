import { CategoryVisibility } from "../enums/category-visibility";

export class Category {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public visibility: CategoryVisibility
  ) {}
}
