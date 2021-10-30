import { TileType } from "../../../utils/tileType";
import { map } from "./map";
import "./Board.css";
import { useAppSelector } from "../../../app/hooks";

const renderRows = (board: JSX.Element[][]) => {
  return board.map((row) => <div className="rendered-row">{row}</div>);
};
const renderPlayers = (board: JSX.Element[][], summoners: teamedSummoner[]) => {
  summoners.forEach((s, i) => {
    const { x, y } = s.position;
    board[y][x] = <span className={"rendered-tile"}>{i}</span>;
  });
  return board;
};
const renderBoard = (board: TileType[][]) => {
  let render = [];
  for (let y = 0; y < board.length; y++) {
    let row = [];
    for (let x = 0; x < board[0].length; x++) {
      if (board[y][x] === TileType.NORMAL) {
        row.push(<span className={"rendered-tile"}>.</span>);
      }
      if (board[y][x] === TileType.WALL) {
        row.push(<span className={"rendered-tile"}>#</span>);
      }
      if (board[y][x] === TileType.START) {
        row.push(<span className={"rendered-tile"}>$</span>);
      }
    }

    render.push(row);
  }
  return render;
};
const Board = () => {
  const { teamOne, teamTwo } = useAppSelector((state) => state.battle);
  const summoners = [
    ...teamOne.map((e) => ({ ...e, team: 1 })),
    ...teamTwo.map((e) => ({ ...e, team: 2 })),
  ];
  const renderedMap = renderRows(
    renderPlayers(renderBoard(map), summoners)
  ).slice(6, 25);
  return <div className={"rendered-board"}>{renderedMap}</div>;
};

export default Board;
