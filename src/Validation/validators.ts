import Joi from "joi";
import expressJoiValidator from "express-joi-validation";
import { inventories, readerTypes, roles } from "../types/types";

class Validator {
  validate = expressJoiValidator.createValidator({});

  user = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
  });

  createUser = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    roleType: Joi.string().required(),
    email: Joi.string().required().email(),
  });

  createRole = Joi.object({
    type: Joi.string().required(),
  });

  // createUser = Joi.object({
  //   name: Joi.string().required(),
  //   phoneNumber: Joi.string().required().length(10),
  //   pin: Joi.any().when("role", {
  //     is: roles.employee,
  //     then: Joi.string().required(),
  //   }),
  //   secret: Joi.string().empty(),
  //   role: Joi.string()
  //     .empty()
  //     .valid(...Object.values(roles))
  //     .required(),
  // });

  createReader = Joi.object({
    ant: Joi.string(),
    readerId: Joi.string().required(),
    readerType: Joi.string()
      .valid(...Object.values(readerTypes))
      .required(),
    antennas: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        power: Joi.string(),
        manufacture: Joi.string(),
        ipRating: Joi.string(),
        connector: Joi.string(),
        inventoryId: Joi.number(),
      })
    ),
    noOfAntennas: Joi.number(),
    manufacture: Joi.string(),
    os: Joi.string(),
    inventoryId: Joi.number(),
  });

  createSession = Joi.object({
    userIds: Joi.array().items(Joi.number()).required(),
    bayNumber: Joi.alternatives(Joi.number(), Joi.string()).required(),
    gameId: Joi.number().required(),
    duration: Joi.number().required(),
  });

  updateSession = Joi.object({
    id: Joi.number().required(),
    bayNumber: Joi.alternatives(Joi.number(), Joi.string()),
    gameId: Joi.number(),
    duration: Joi.number(),
  });

  updateBay = Joi.object({
    number: Joi.string().required(),
    floorNumber: Joi.string(),
    antennas: Joi.array().items(Joi.string()),
    // status: Joi.string().valid(...Object.values(bayStatus)),
  });

  createBay = Joi.object({
    number: Joi.string().required(),
    floorNumber: Joi.string().required(),
    antennas: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        power: Joi.string(),
        manufacture: Joi.string(),
        ipRating: Joi.string(),
        connector: Joi.string(),
      })
    ),
  });

  createAntenna = Joi.object({
    name: Joi.string().required(),
    readerID: Joi.string(),
    bay: Joi.number(),
    active: Joi.boolean(),
  });

  updateAntenna = this.createAntenna.keys({
    id: Joi.number().required(),
    name: Joi.string(),
  });

  createFloor = Joi.object({
    floorNumber: Joi.string().required(),
  });

  createScore = Joi.object({
    gameId: Joi.number().required(),
    pitAntennaId: Joi.number().required(),
    score: Joi.number().required(),
  });

  updateScore = Joi.object({
    id: Joi.number().required(),
    gameId: Joi.number(),

    pitAntennaId: Joi.number(),
    score: Joi.number(),
  });

  login = Joi.object({
    email: Joi.string().required().email(),
  });

  createTransaction = Joi.object({
    amount: Joi.number().required(),
    sessionId: Joi.number().required(),
    userId: Joi.number().required(),
  });

  cancelBooking = Joi.object({
    pin: Joi.string().required(),
    mobileNo: Joi.string().required(),
  });

  createGame = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  });

  updateGame = Joi.object({
    id: Joi.number().required(),
    name: Joi.string(),
    price: Joi.number(),
  });

  createInventory = Joi.object({
    type: Joi.string(),
    categoryName: Joi.string().required(),
    name: Joi.valid(...Object.values(inventories)),
    quantity: Joi.number().required(),
    details: Joi.object().optional(),
  });

  createCategory = Joi.object({
    name: Joi.string().required(),
  });

  acknowledge = Joi.object({
    uuid: Joi.string().required(),
  });
}
const validator = new Validator();
const validate = validator.validate;
export { validate };
export default validator;
