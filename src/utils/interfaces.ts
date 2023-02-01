import { AjvError, FormValidation, IdSchema, UiSchema } from "react-jsonschema-form";

export interface IMaterial {
    materialName:String,
    vendor:String,
    price:number,
    quantity:number,
    position:String,
    withdrawal:number
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

