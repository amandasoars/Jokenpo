import { useState } from 'react';
import './App.css'; 
import { FaHandRock, FaHandScissors, FaHandPaper } from "react-icons/fa";

const actions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function randomAction(){
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index]; 
}

function calculateWinner(action1, action2){
  if(action1===action2){
    return 0; 
  }else if(actions[action1]===action2 ){
    return -1;
  }else if(actions[action2]===action1 ){
    return 1;
  }
  
//nunca acontecer  
  return null;

}
function ActionIcon({action, ...props}){
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors
  };
  const Icon = icons[action];
  return <Icon {...props}/>;
}

function Player({name = "Player", action="rock"}){
  return(
      <div className="player">
        <div className='score'>{name}</div>
        <div className='action'> 
         {action && <ActionIcon action={action} size={60}/>}
        </div>
      </div>
  )
}

function ActionButton({action = "rock", onActionSelected }){
  return(
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={30} />
      </button>
  )
}

function ShowWinner({winner = 0}){
  const text = {
    "-1": "Você ganhou essa rodada!",
    0: "Empate",
    1: "Você perdeu essa rodada!"
  };
  return(
    <h2>{text[winner]}</h2>
  )
}


function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [empateScore, setEmpateScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const onActionSelected=(selectedAction) => {
    const newComputerAction = randomAction();
    
    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);
    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1){
      setPlayerScore(playerScore + 1);

    }else if (newWinner === 1){
      setComputerScore(computerScore + 1);
    }else if(newWinner === 0){
      setEmpateScore(empateScore + 1);
    }
  };

  function Encerrar({playerScore, computerScore}){
    console.log(playerScore +'  '+computerScore)
    if(playerScore > computerScore){
      return(
       
        <p>Você ganhou o jogo!</p>         
      ) 
    }else if(computerScore > playerScore){
      return(
        <p>Você perdeu o jogo!</p>         
      ) 
    }else{
      return(
        <p>Você empatou</p>         
      ) 
    }
  }

  return (
  
  <div className="center">
    <h1> JOKENPÔ</h1>
    <div className="placar">
        <h3>Placar</h3>
        <p>Jogador: {playerScore}</p>
        <p>Empate: {empateScore}</p>
        <p>Computador: {computerScore}</p>
        
    </div>
    <div className='jogo'>
      <div className="container">
       <Player name="Jogador" score={playerScore} action={playerAction}/>
       <Player name= "Computador" score={computerScore} action={computerAction}/>
      </div>
      <div>
         <ActionButton action = "rock" onActionSelected={onActionSelected}/>
         <ActionButton action = "paper" onActionSelected={onActionSelected}/>
         <ActionButton action = "scissors" onActionSelected={onActionSelected}/>
         

      </div>
      <ShowWinner winner={winner}/>     
      <h2 className='resultado'></h2>
        {/* <button onClick={() => Encerrar({ playerScore, computerScore })}>Encerrar o jogo</button>
        <p>{teste}</p> */}
      <h2> Recarregue a página para jogar novamente</h2>
    </div>
  </div>
  )
}

export default App
