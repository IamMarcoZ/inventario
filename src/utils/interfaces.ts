import { AjvError, FormValidation, IdSchema, UiSchema } from "react-jsonschema-form";

export interface IMaterial {
    materialName:string,
    vendor:string,
    price:number,
    quantity:number,
    position:string,
    withdrawal:number
}
export interface IUser {
    email:string,
    password:string,
}
export interface IChangeEvent<T = any> {
    edit: boolean;
    formData: T;
    errors: AjvError[];
    errorSchema: FormValidation;
    idSchema: IdSchema;
    uiSchema: UiSchema;
    status?: string;
}

export type ISubmitEvent<T> = IChangeEvent<T>;

