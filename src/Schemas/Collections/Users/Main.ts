import { model, Schema } from "mongoose";

export interface PetTypes {
  cat_girl: any;
  dragon: any;
  frog: any;
  dinosaur: any;
  toad: any;
  rock: any;
  crab: any;
  snake: any;
  dog: any;
  cat: any;
  ferret: any;
  parrot: any; // Random chance it repeats your last said message.
}
export interface Item {}

export interface Pet {
  name: string;
  type: keyof PetTypes;
}
export interface User {
  userId: string;
  wallet: number;
  bank: number;
  bank_cap: number;
  items: Array<Item>;
  pet: Pet;
  multi: number;
}

export default model(
  "User/Main",
  new Schema<User>({
    userId: { type: String },
    wallet: { type: Number, default: 1000 },
    bank: { type: Number, default: 0 },
    bank_cap: { type: Number, default: 25000 },
    items: [{ type: Object }],
    pet: { type: Object },
    multi: { type: Number, default: 2}
  })
);
