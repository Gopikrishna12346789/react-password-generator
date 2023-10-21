
import { useCallback, useState,useEffect,useRef } from "react";
import Card from './Card';
import Lists from "./Lists";
import './index.css';


function App() {
  const[length,setLength]=useState(8)
  const[Number,setNumber]=useState(false);
  const[character,setcharacter]=useState(false)
  const[Password,setpassword]=useState('')

  const passwordRef=useRef(null)

  const passwordGenerator =useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      if(Number){
        str=str+"0123456789"
      }
      if(character){
        str +="!#@$%^&*"
      }

      for(let i=1; i<length;i++){
        let char=Math.floor(Math.random()*str.length+1)
        pass= pass+ str.charAt(char)

      }
      setpassword(pass)
      

  },[length,Number,character,setpassword])

  const copyPassword= useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(Password)
  },[Password])
  useEffect(()=>{
    passwordGenerator()
  },[length,Number,character,passwordGenerator])
  
   return(
     <div className="box-1"> 

     <h1 className="pass">Password Generator</h1>
     <div className="box-2">
          <input type="text" value={Password} placeholder="password "  ref={passwordRef} className="ran2"/>
          <button onClick={copyPassword}>copy</button>
     </div>
     <div className="box-3">
         <div className="box-4">
         <input type="range" value={length} onChange={(e)=>setLength(e.target.value)}className="ran"/>
         <label>length:{length}</label>
          </div>
          <div className="box-5">
            <input type="checkbox"  id="numberInput"onChange={(e)=>setNumber((prev)=>!prev)}></input>
         
            <label htmlFor="numberInput">Numbers</label>
           
          </div>
          <div className="box-6">
            <input type="checkbox"  id="charInput"onChange={(e)=>setcharacter((prev)=>!prev)}></input>
         
            <label htmlFor="charInput">characters</label>
           
          </div>
       
         
     </div>
     </div>
   )
}

export default App;
