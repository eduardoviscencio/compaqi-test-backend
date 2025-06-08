import { Location } from "../models";

import { type LocationDocumentT } from "../types/locationDocument.type";
import { type TypedRequest } from "../types/request.type";
import { type TypedResponse } from "../types/response.type";

type LocationsResponseT = {
  locations: LocationDocumentT[];
};

export const fetchLocations = async (
  _: any,
  res: TypedResponse<LocationsResponseT>
) => {
  try {
    const locations = await Location.find();

    res.status(200).json({
      ok: true,
      locations,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

type SaveLocatonRequestBodyT = {
  tag: string;
  latitude: number;
  longitude: number;
  placeId: string;
};

export type SaveLocationResponseT = {
  location?: LocationDocumentT;
};

export const saveLocation = async (
  req: TypedRequest<SaveLocatonRequestBodyT>,
  res: TypedResponse<SaveLocationResponseT>
) => {
  try {
    const { tag, latitude, longitude, placeId } = req.body;

    const { sub, email } = req.user!;

    const newLocation = new Location({
      tag,
      latitude,
      longitude,
      placeId,
      sub,
      user_email: email,
    });

    await newLocation.save();

    res.status(201).json({ ok: true, location: newLocation });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const deleteLocation = async (req: TypedRequest, res: TypedResponse) => {
  try {
    const { id } = req.params;

    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ ok: false, message: "Location not found" });
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};
