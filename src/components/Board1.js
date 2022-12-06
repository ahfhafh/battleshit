import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Shit from './Shit';
import { Board } from "../boardhelper";

const ShitTypes = [
  {
    name: 'carrier1',
    length: 5,
    placed: null,
  },
  {
    name: 'battleship1',
    length: 4,
    placed: null,
  },
  {
    name: 'cruiser1',
    length: 3,
    placed: null,
  },
  {
    name: 'submarine1',
    length: 3,
    placed: null,
  },
  {
    name: 'destroyer1',
    length: 2,
    placed: null,
  },
];

const Board1 = () => {
  const [board1, setBoard1] = useState(new Board());
  const [highlighted_cells, setHighlighted_cells] = useState([]);
  const [shitIsHovering, setShitIsHovering] = useState(false);
  const [shitsRotated, setShitsRotated] = useState(false);

  const cells = board1.cells.map((row, rowIndex) => {
    return (
      row.map((col, colIndex) => {
        return <Cell key={rowIndex * 10 + colIndex + 101 + shitsRotated} id={rowIndex * 10 + colIndex + 101} shitsRotated={shitsRotated} highlighted_ids={highlighted_cells} shitIsHovering={shitIsHovering} setHighlight_ids={(ids) => setHighlighted_cells(ids)} setShitIsHovering={(bool) => setShitIsHovering(bool)} />;
      })
    );
  });

  return (
    <div>
      <div className='board1 flex flex-wrap mx-auto'>
        {cells}
      </div>
      <button className='rotateShits' type="button" onClick={() => setShitsRotated(!shitsRotated)}>Rotate shits</button>
      <div className={`board1Shits mt-4 flex ${shitsRotated ? 'flex-row' : 'flex-col'}`}>
        {ShitTypes.map(({ name, length, placed }, i) => {
          return <Shit key={name} name={name} length={length} shitsRotated={shitsRotated} setShitIsHovering={(bool) => setShitIsHovering(bool)} />
        })}
      </div>

    </div>

  );
}

export default Board1;