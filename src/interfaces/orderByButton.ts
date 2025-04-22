import OrderBy from "../types/orderBy";

export default interface OrderByButton {
  name: string,
  order: OrderBy[],
  isDescending: boolean
}