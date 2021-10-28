import { TileType } from "../../../utils/tileType";
import { map } from "./map";
import './Board.css'
const renderBoard= (board: TileType[][]) => {
  let render = [];
  for (let y = 0; y < board.length; y++) {
    let row = [];
    for (let x = 0; x < board[0].length; x++) {
      if (board[y][x] === TileType.NORMAL) {
        row.push(<span className={'rendered-tile'}>.</span>);
      }
      if (board[y][x] === TileType.WALL) {
        row.push(<span className={'rendered-tile'}>#</span>);
      }
      if (board[y][x] === TileType.START) {
        row.push(<span className={'rendered-tile'}>$</span>);
      }
      
    }
    
    render.push(<div className={'rendered-row'}>{row}</div>);
  }
  return render;
};
const Board = () => {
  const renderedMap = renderBoard(map).slice(6, 25);
  return <div className={'rendered-board '}>{renderedMap}</div>;
};

export default Board