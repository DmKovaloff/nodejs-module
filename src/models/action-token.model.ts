import { model, Schema } from "mongoose";

import { IActionToken } from "../interfaces/action-token.interface";
import { User } from "./user.model";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum";

const actionTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    type: { type: String, required: true, enum: ActionTokenTypeEnum},
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  { timestamps: true, versionKey: false },
);

export const ActionToken = model<IActionToken>("action-tokens", actionTokenSchema);
