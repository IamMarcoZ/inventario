
import { useEffect, useState } from 'react'
import { IUser } from '../utils/interfaces';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config';
import "../css/login.css"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"



export interface ILoginProps {
  onInput?: (e: InputEvent) => void;
  onSubmit?: (user: IUser) => void;
  onChange?: (user: IUser) => void;
  onCancel?: () => void;
  isAuth: string
}
export interface ILoginState {
  user: IUser;
  isAuth: string;
  onInput?: (e: InputEvent) => void;
  onSubmit?: (user: IUser) => void;
  onChange?: (user: IUser) => void;
  onCancel?: () => void;

}

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState("false")
  const isAuth = sessionStorage.getItem("isAuth")





  const onFormSubmit = async (e: any) => {
    e.preventDefault()


    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        sessionStorage.setItem("isAuth", "true")
        toast.info('Login effettuato con successo')
        setTimeout(() => {
          window.location.reload()
        }, 3000);
        
       
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      })

  }
  const openToast = () => {
    
  }

  return (

    <><div className="divForm">

      <form className='form'>
        <label className='label'>E-MAIL</label> <br />
        <input className='inputForm' id='current-email' type={"email"} value={email} onChange={(e: any) => setEmail(e.target.value)} /> <br />
        <label className='label'>PASSWORD</label> <br />
        <input className='inputForm' id='current-password' type={"password"} value={password} onChange={(e: any) => setPassword(e.target.value)} /> <br />
        <button className='loginBtn' type="submit" onClick={(e) => onFormSubmit(e)}>LOGIN</button>
      </form>

    </div><ToastContainer
      /></>
  );


}
export default Login







