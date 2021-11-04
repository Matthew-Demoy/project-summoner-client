import { TileType } from "../../../utils/tileType";
import { map } from "./map";
import "./Board.css";
import { useAppSelector } from "../../../app/hooks";
import { SyntheticEvent } from "hoist-non-react-statics/node_modules/@types/react";
import { useDispatch } from "react-redux";
import { moveSummoner, selectSummoner } from "../battleSlice";

const getClassLetter = (sClass: number) => {
  if (sClass === 1) {
    return "B";
  }
  if (sClass === 2) {
    return "b";
  }
  if (sClass === 3) {
    return "C";
  }
  if (sClass === 4) {
    return "D";
  }
  if (sClass === 5) {
    return "F";
  }
  if (sClass === 6) {
    return "M";
  }
  if (sClass === 7) {
    return "P";
  }
  if (sClass === 8) {
    return "R";
  }
  if (sClass === 9) {
    return "r";
  }
  if (sClass === 10) {
    return "S";
  }
  if (sClass === 11) {
    return "W";
  }
  return "?";
};
const renderRows = (board: JSX.Element[][]) => {
  return board.map((row) => <div className="rendered-row">{row}</div>);
};

const renderPaths = (board: JSX.Element[][], preMoves: position[]) => {
  console.log(preMoves.length);
  preMoves.forEach((s, i) => {
    const { x, y } = s;
    board[y][x] = (
      <span
        className={"rendered-tile path-tile"}
        id={"path-tile"}
        data-x={x}
        data-y={y}
      >
        .
      </span>
    );
  });

  return board;
};
const renderPlayers = (board: JSX.Element[][], summoners: teamedSummoner[]) => {
  summoners.forEach((s, i) => {
    const { x, y } = s.position;
    const { team, class: sClass } = s;

    const summonerClasses = ["rendered-tile", "summoner-tile"];
    if (s.selected) {
      summonerClasses.push("selected-summoner");
    }
    if (team === 1) {
      summonerClasses.push("team-one");
    } else {
      summonerClasses.push("team-two");
    }

    board[y][x] = (
      <span
        id={s.id.toString()}
        key={s.id}
        data-x={x}
        data-y={y}
        className={summonerClasses.join(" ")}
      >
        {getClassLetter(sClass || -1)}
      </span>
    );
  });
  return board;
};
const renderBoard = (board: TileType[][]) => {
  let render = [];
  for (let y = 0; y < board.length; y++) {
    let row = [];
    for (let x = 0; x < board[0].length; x++) {
      if (board[y][x] === TileType.NORMAL) {
        row.push(
          <span
            className={"rendered-tile moveable-tile"}
            id={"moveable-tile"}
            data-x={x}
            data-y={y}
          >
            .
          </span>
        );
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
  const dispatch = useDispatch();
  const { summoners, potentialActions } = useAppSelector(
    (state) => state.battle
  );

  const renderedMap = renderRows(
    renderPaths(
      renderPlayers(renderBoard(map), summoners),
      potentialActions.preMoves
    )
  ).slice(6, 25);

  const handleBoardClick = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    //@ts-ignore
    const id = target.id;
    if (id === "moveable-tile") {
      const dataX = target.getAttribute("data-x");
      const dataY = target.getAttribute("data-y");
      console.log(dataX)
      if (dataX && dataY) {
        const x = parseInt(dataX);
        console.log(x)
        const y = parseInt(dataY);
        dispatch(moveSummoner({ x, y }));
      }
    } else if (id) {
      dispatch(selectSummoner(parseInt(id)));
    }
  };
  return (
    <div onClick={handleBoardClick} className={"rendered-board"}>
      {renderedMap}
    </div>
  );
};

export default Board;
