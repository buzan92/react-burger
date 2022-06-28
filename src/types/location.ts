import { Location } from "history";

export type TLocation = Location & {
  isModal?: boolean;
};
