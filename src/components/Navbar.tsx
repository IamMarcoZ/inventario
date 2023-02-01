import { Component } from 'react'
import { Link } from 'react-router-dom'
import "../css/navbar.css"


export default class Navbar extends Component {
  render() {
    return (
    
      <div className='container' >
        <h1 className='title'>BIOWARE</h1>
        
        <nav>
            <ul>
               <Link  className='text-link' to={"/materialsForm"} ><button className='routerBtn'>AGGIUNGI MATERIALE</button> </Link>
               <Link  className='text-link' to={"/materialsList"} ><button className='routerBtn'>LISTA DEI MATERIALI</button> </Link>
            </ul>
        </nav>
      </div>
    )
  }
}

