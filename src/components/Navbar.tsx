import { signOut } from 'firebase/auth'
import {useEffect } from 'react'
import "../css/navbar.css"
import { auth } from '../firebase-config'
import ConditionalNavLink from './conditionalNavlink'


const Navbar =()=> {
  const token = sessionStorage.getItem("token")
  const isAuth = sessionStorage.getItem("isAuth")
  

  
  
  function logout(){
    signOut(auth).then(() => {
      sessionStorage.clear()
      
      window.location.reload()
    }).catch((error) => {
      // An error happened.
    });
    
  }

    return (
    
      <div className='container' style={{background:"grey"}}>
        <h1 className='title'>INVENTARIO</h1>
        <nav>
            <ul>
               <ConditionalNavLink  className='text-link' to={"/materialsForm"}  disabled={!token} ><button className='routerBtn'>AGGIUNGI MATERIALE</button> </ConditionalNavLink>
               <ConditionalNavLink  className='text-link' to={"/materialsList"} disabled={!token}><button className='routerBtn'>LISTA DEI MATERIALI</button> </ConditionalNavLink>
               {token && token.toString().length > 100 && isAuth?  <button className='routerBtn' type='button' onClick={()=>logout()}>LOG OUT</button>
               :
                null
               }
            </ul>
        </nav>
      
      </div>
    )
  }

 

export default  Navbar
