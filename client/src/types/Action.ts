import { Action as ActionRedux } from "@reduxjs/toolkit";

export default interface Action<T = any> extends ActionRedux {
  payload?: T;
}
