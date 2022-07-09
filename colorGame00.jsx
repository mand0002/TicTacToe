const Square = ({ id, player, newState })=>{
    const [color, setColor] = React.useState('green');
    const [status, setStatus] = React.useState(null);
    const XorO= ["O","X"];
  
    const palet = ['red', 'blue', 'green'];
    const getRandomColor =()=> palet[Math.floor(Math.random()*3)];
   
    React.useEffect(()=>{
        console.log(`Render ${id}`);
        return ()=> console.log(`unmounting Square ${id}`);
    });
    //keep track of state of square
    return (
        //change color of square on click
    <button 
        onClick={e =>  {
        let col = getRandomColor();
        setColor(col);
        let nextplayer = newState(id);
        setStatus(nextplayer);
        e.target.style.background = col;
    }}>
        <h1>{XorO[status]}</h1>
    </button>
    );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));
  let status = `Player ${player}`;
  let winner = checkForWinner(state);
  if(winner != null) status = `Player ${winner} wins`

  const newState = idOfSquare => {
    let thePlayer = player;
    state[idOfSquare] = player; //player is present player
    setState(state); //state is array of 0 or 1 or null
    let nextplayer = (player + 1) %2;
    setPlayer(nextplayer);

    return thePlayer;  //we need to return the present player
  }

  //const toggle = ()=> setMounted(!mounted);
  //const reRender = ()=>setRandom(Math.random());
  
  function renderSquare(i) {
    return <Square id={i} newState={newState}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <button>Show/Hide Row</button>
        <button>Re-render</button>
        <h1> {status} </h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
