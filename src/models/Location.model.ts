import { Schema, model, Document } from "mongoose";

import { type LocationDocumentT } from "../types/locationDocument.type";

const LocationSchema = new Schema<LocationDocumentT>({
  tag: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  placeId: { type: String, required: true },
  sub: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
});

LocationSchema.method("toJSON", function () {
  const { __v, _id, ...obj } = this.toObject();

  return {
    ...obj,
    id: _id.toString(),
  };
});

const LocationModel = model<LocationDocumentT>("Location", LocationSchema);

export default LocationModel;
