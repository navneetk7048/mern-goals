import Slice from "./Slice";
import User from "./User";

export default interface SliceAuth extends Slice {
  user: User | null;
}
