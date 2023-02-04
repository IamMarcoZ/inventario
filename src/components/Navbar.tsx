import { signOut } from 'firebase/auth'
import {useEffect } from 'react'
import "../css/navbar.css"
import { auth } from '../firebase-config'
import ConditionalNavLink from './conditionalNavlink'


const Navbar =()=> {
  const isAuth = sessionStorage.getItem("isAuth")
  
  useEffect(() => {
    console.log(isAuth)
  
  }, [isAuth])
  
  
  function logout(){
    signOut(auth).then(() => {
      sessionStorage.removeItem("isAuth")
      window.location.reload()
    }).catch((error) => {
      // An error happened.
    });
    
  }

    return (
    
      <div className='container' >
        <h1 className='title'>BIOWARE</h1>
        <nav>
            <ul>
               <ConditionalNavLink  className='text-link' to={"/materialsForm"}  disabled={!isAuth} ><button className='routerBtn'>AGGIUNGI MATERIALE</button> </ConditionalNavLink>
               <ConditionalNavLink  className='text-link' to={"/materialsList"} disabled={!isAuth}><button className='routerBtn'>LISTA DEI MATERIALI</button> </ConditionalNavLink>
               {isAuth?  <button className='routerBtn' type='button' onClick={()=>logout()}>LOG OUT</button>
               :
                null
               }
            </ul>
        </nav>
      
      </div>
    )
  }

 

export default  Navbar
