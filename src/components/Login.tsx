import { PrimaryButton } from '@fluentui/react';
import React, { Component } from 'react'
import Form from 'react-jsonschema-form';
import { IUser } from '../utils/interfaces';
import { addLocValues } from '../utils/strings';

export const formSchema = addLocValues(require("./login.json"));
export const formUI = addLocValues(require("./loginUI.json"));

export interface ILoginProps {
    onInput?: (e: InputEvent) => void;
    onSubmit?: (user: IUser) => void;
    onChange?: (material: IUser) => void;
    onCancel?: () => void;
    formSchema?: any;
    formUI?: any;
  }
  export interface ILoginState {
    user: IUser;
    onInput?: (e: InputEvent) => void;
    onSubmit?: (material: IUser) => void;
    onChange?: (material: IUser) => void;
    onCancel?: () => void;
    formSchema: any;
    formData: IUser;
    formUI?: any;
  }

export class Login extends Component<ILoginProps,ILoginState> {
   
    constructor(props: ILoginState) {
        super(props);
        this.state = {
            formUI: formUI,
            formSchema: formSchema,
            formData: { ...props.user },
            user: props.user,
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

            <PrimaryButton
              value={"INDIETRO"}
              className="cancelBtn"
              title="CANCEL"
              type="button"
              onClick={this.onFormCancel}
            >
              INDIETRO
            </PrimaryButton>
          </div>
        </Form>
      </div>
    );
  }



  private onFormChange(){
        
  }

  private onFormSubmit(){
  }
  private onFormCancel(){}
  
}

  

export default Login