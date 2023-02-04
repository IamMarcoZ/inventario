import { Component, useEffect } from 'react'
import { Link,Navigate, redirect } from 'react-router-dom'
import "../css/navbar.css"
import ConditionalNavLink from './conditionalNavlink'


const Navbar =()=> {
  const isAuth = sessionStorage.getItem("isAuth")
  
  useEffect(() => {
    console.log(isAuth)
  
  }, [isAuth])
  
  
    return (
    
      <div className='container' >
        <h1 className='title'>BIOWARE</h1>
        <nav>
            <ul>
               <ConditionalNavLink  className='text-link' to={"/materialsForm"}  disabled={!isAuth} ><button className='routerBtn'>AGGIUNGI MATERIALE</button> </ConditionalNavLink>
               <ConditionalNavLink  className='text-link' to={"/materialsList"} disabled={!isAuth}><button className='routerBtn'>LISTA DEI MATERIALI</button> </ConditionalNavLink>
            </ul>
        </nav>
      
      </div>
    )
  }

 

export default  Navbar
