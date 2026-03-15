import { useEffect, useState } from "react"
import { supabase } from "../../supabaseClient"

function About(){

  const [team,setTeam] = useState([])

  useEffect(()=>{

    const fetchTeam = async () => {

      try{

        const { data, error } = await supabase
          .from('team')
          .select('*')

        if (error) {
          throw error
        }

        setTeam(data)

      }catch(error){
        console.error(error)
      }

    }

    fetchTeam()

  },[])

  return(

    <div>

      <h1>About Page</h1>

      <h2>Our Team</h2>

      {team.map(member => (

        <div key={member.id} style={{marginBottom:"20px"}}>

          <img 
            src={member.image} 
            alt={member.name} 
            width="200"
          />

          <h3>{member.name}</h3>

          <p>{member.role}</p>

        </div>

      ))}

    </div>

  )

}

export default About