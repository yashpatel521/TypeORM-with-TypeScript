import { Request } from "express";
import { User } from "../entity/user.entity";

export type AuthRequest = Request & { user?: User };
export enum readerTypes {
  bay = "bay",
  pit = "pit",
}

export type readerTypesType = "bay" | "pit";

export enum bayStatus {
  available = "available",
  available_soon = "available_soon",
  held = "held",
  booked = "booked",
  unavailable = "unavailable",
}

export type bayStatusTypes =
  | "available"
  | "available_soon"
  | "held"
  | "booked"
  | "unavailable";

export type roleType =
  | "admin"
  | "customer"
  | "floorManager"
  | "employee"
  | "manger";

export enum roles {
  admin = "admin",
  customer = "customer",
  floorManager = "floorManager",
  employee = "employee",
  manger = "manger",
}

export type weekDayType = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const weekDaysArray = [1, 2, 3, 4, 5, 6, 7];

export type discountType = "AMOUNT" | "PERCENTAGE" | "TIME" | "BARGAIN_PRICE";

export enum discounts {
  AMOUNT = "AMOUNT",
  PERCENTAGE = "PERCENTAGE",
  TIME = "TIME",
  BARGAIN_PRICE = "BARGAIN_PRICE",
}

export enum staffRoles {
  floorManager = "floorManager",
  employee = "employee",
  manger = "manger",
}

export enum inventories {
  reader = "reader",
  antenna = "antenna",
}

export type inventoriesTypes = "reader" | "pit";

export type antennaPartialType = {
  name: string;
  power: string;
  manufacture: string;
  ipRating: string;
  connector: string;
  inventoryId: number;
};

export type updateBay = {
  number: string;
  status?: bayStatusTypes;
  floor?: string;
  antennas?: string[];
  bookedTill?: Date | null;
};

export type updateAnt = {
  id: number;
  name?: string;
  active?: boolean;
  readerID?: string;
  bay?: number;
};

export type updateScore = {
  id: number;
  score?: number;
  gameId?: number;
  pitAntennaId?: number;
  bayAntennaId?: number;
};

export type updateSession = {
  id: number | string;
  cancel?: boolean;
  duration?: number;
  gameID?: number;
  bayNumber?: string;
  active?: boolean;
};

export type RequestError = Error & {
  code: number;
};

export type ID = number | string;
export type ScoreData = {
  score: number;
  scoreText: string;
  epc?: string;
  sessionUserId?: number;
  metaData?: any;
};

export type acknowledge = {
  uuid?: string;
  deviceId?: string;
  isAcknowledge?: boolean;
};

export type FilteredUser = {
  name?: string;
  phoneNumber?: string;
  ids?: number[];
  role?: string;
};
export type CreateReaderType = {
  readerLocation: string;
  readerId: string;
  readerType: string;
  noOfAntennas: number;
  manufacture: string;
  os: string;
  antennas: antennaPartialType[];
  inventoryId: number;
};

export default { readerTypes, bayStatus };
