import { Component } from "react";
import { IMaterial } from "../utils/interfaces";
import { addLocValues } from "../utils/strings";
import { PrimaryButton } from "@fluentui/react";
import { addDoc, collection } from "firebase/firestore";

import {
  IChangeEvent,
  ISubmitEvent,
} from "react-jsonschema-form";
import Form from "react-jsonschema-form";
import "bootstrap";
import { db } from "../firebase-config";
import { toast, ToastContainer } from "react-toastify";
require("../css/form.css");

export const formSchema = addLocValues(require("./materialsForm.json"));
export const formUI = addLocValues(require("./materialsFormUI.json"));

export interface IMaterialFormProps {
  onInput?: (e: InputEvent) => void;
  onSubmit?: (material: IMaterial) => void;
  onChange?: (material: IMaterial) => void;
  onCancel?: () => void;
  formSchema?: any;
  formUI?: any;
}
export interface IMaterialState {
  material: IMaterial;
  onInput?: (e: InputEvent) => void;
  onSubmit?: (material: IMaterial) => void;
  onChange?: (material: IMaterial) => void;
  onCancel?: () => void;
  formSchema: any;
  formData: IMaterial;
  formUI?: any;
}

export class MaterialsForm extends Component<
  IMaterialFormProps,
  IMaterialState
> {
  constructor(props: IMaterialState) {
    super(props);
    this.state = {
      formUI: formUI,
      formSchema: formSchema,
      formData: { ...props.material },
      material: props.material,
    };
  }

  render() {
    return (
      <div className="container col-md-4">
        <Form
          uiSchema={this.state.formUI}
          className="row g-3 align-items-center md-3"
          showErrorList={false}
          noHtml5Validate={true}
          onChange={this.onFormChange}
          formData={this.state.formData}
          schema={this.state.formSchema}
          onSubmit={this.onFormSubmit}
        >
          <div>
            <PrimaryButton
              value={"AGGIUNGI"}
              className="addBtn"
              type="submit"
              title="AGGIUNGI"
            >
              AGGIUNGI
            </PrimaryButton>
          </div>
        </Form>
        <ToastContainer
      />
      </div>
    );
  }
  private updateMaterial(e: IChangeEvent) {
    const newMaterial = {
      materialName: e.formData.materialName,
      vendor: e.formData.vendor,
      price: e.formData.price,
      quantity: e.formData.quantity,
      position: e.formData.position,
      withdrawal: e.formData.withdrawal,
    };
    this.setState({ material: newMaterial });
  }
  private onFormChange(changeEvent: IChangeEvent<IMaterial>) {}

  private async onFormSubmit(args: ISubmitEvent<IMaterial>) {
    const emptyMaterial: IMaterial = {
      materialName: "",
      vendor: "",
      price: 0,
      quantity: 0,
      position: "",
      withdrawal: 0,
    };
    try {
      const materialsDbRef = collection(db, "Materials");
      const material: IMaterial = args.formData;
      addDoc(materialsDbRef, material)
      
      toast.info(`Hai aggiunto ${material.materialName} nel database!`)
     
    } catch (e) {
      console.log(e);
    }
    finally{
      setTimeout(() => {
        window.location.reload();
      }, 1000);
     
  }

}
}
export default MaterialsForm;
