export interface IUser {
  _id: string;
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  image: string | null;
  googleID: string;
}

export interface ICocktail {
  _id: string;
  name: string;
  user: string;
  image: string | null;
  recipe: string;
  isPublished: boolean;
  ingredients: IIngredients[];
}

export interface IIngredients {
  _id?: string;
  nameIng: string,
  qty: string,
}

export interface CocktailMutation {
  name: string,
  image: File| null,
  recipe: string,
  ingredients?: IIngredients[],
  user: string,
}

export interface RegisterMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: IUser;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export class GlobalError {
  error: string;
}