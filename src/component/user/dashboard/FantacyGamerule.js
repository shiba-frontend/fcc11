import React, { useEffect, useState } from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ApiConnection from '../../../utils/ApiConnection';

const FantacyGamerule = () => {
    const [loading, setloading] = useState(false)
    const [gamerule, setgamerule] = useState({})

    const navigate = useNavigate()
    let {pros, id, id1} = useParams()

    console.log(pros)

    const GameRulesHandle = async () => {

        setloading(true)
        try {
          const  response = await ApiConnection.get(`get-game-rules?game_admin=${id}&fantasygame_id=${id1}`)
          if(response?.status == 200){
            setloading(false)
              setgamerule(response.data?.data?.list)
            
          } else{
              setloading(false)
          }  
      } catch(err){
          setloading(false)
      }
      
      
      }

      useEffect(()=>{
        GameRulesHandle()
        window.scrollTo(0, 0)
      },[])


  return (
    <>
    <LoginHeaderTwo  heading={`Game Rule of ${pros}`} />
    <div className='back-page'>
    <div className='container'>
        <button onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i> Back</button>
        </div>
    </div>
   
    <div className='container'>
            <div className='inner-container'>

            <h3>Game Rules</h3>
            <div className="rule-box game-box">
              <ul>
               
                <li>Maximum Number of Batsman: {Math.round(gamerule?.game_rule?.maximum_number_batsman)}</li>
                <li>Maximum Number of All Rounders: {Math.round(gamerule?.game_rule?.maximum_number_all_rounders)}</li>
                <li>Maximum Number of Bowlers: {Math.round(gamerule?.game_rule?.maximum_number_bowlers)}</li>
                <li>Maximum Number Players from Each Side: {Math.round(gamerule?.game_rule?.maximum_number_players_each_side)}</li>
                <li>Maximum Number of Wicket Keepers: {Math.round(gamerule?.game_rule?.maximum_number_wicket_keepers)}</li>


                <li>Minimum Number of Batsman: {Math.round(gamerule?.game_rule?.minimum_number_batsman)}</li>
                <li>Minimum Number of All Rounders: {Math.round(gamerule?.game_rule?.minimum_number_all_rounders)}</li>
                <li>Minimum Number of Bowlers: {Math.round(gamerule?.game_rule?.minimum_number_bowlers)}</li>
                <li>Minimum Number Players from Each Side: {Math.round(gamerule?.game_rule?.minimum_number_players_each_side)}</li>
                <li>Minimum Number of Wicket Keepers: {Math.round(gamerule?.game_rule?.minimum_number_wicket_keepers)}</li>
              </ul>
            </div>
            <h3>Point Rules</h3>
            <div className="rule-box point-box">
              <ul>
                <li>Bonus: {Math.round(gamerule?.points_rule?.bonus)}</li>
                <li>Boundary bonus: {Math.round(gamerule?.points_rule?.boundary_bonus)}</li>
                <li>Captain: {Math.round(gamerule?.points_rule?.captain)}</li>
                <li>Catch runout: {Math.round(gamerule?.points_rule?.catch_runout)}</li>
                <li>Century bonus: {Math.round(gamerule?.points_rule?.century_bonus)}</li>
                <li>Half century bonus: {Math.round(gamerule?.points_rule?.half_century_bonus)}</li>
                <li>Runs: {gamerule?.points_rule?.runs}</li>
                <li>Six bonus: {Math.round(gamerule?.points_rule?.six_bonus)}</li>
                <li>Vice captain: {Math.round(gamerule?.points_rule?.vice_captain)}</li>
                <li>Wicket: {Math.round(gamerule?.points_rule?.wicket)}</li>
                <li>Wicket bonus 3: {Math.round(gamerule?.points_rule?.wicket_bonus_3)}</li>
                <li>Wicket bonus 4: {Math.round(gamerule?.points_rule?.wicket_bonus_4)}</li>
                <li>Wicket bonus 5: {Math.round(gamerule?.points_rule?.wicket_bonus_5)}</li>
              </ul>
            </div>
            </div>
      </div>
    </>
  )
}

export default FantacyGamerule