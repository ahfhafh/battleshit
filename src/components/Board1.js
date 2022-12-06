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
  const [placedShits, setPlacedShits] = useState([]);

  useEffect(() => {
    console.log(placedShits);
  }, [placedShits])

  const cells = board1.cells.map((row, rowIndex) => {
    return (
      row.map((col, colIndex) => {
        return <Cell key={rowIndex * 10 + colIndex + 100 + shitsRotated} id={rowIndex * 10 + colIndex + 100} shitsRotated={shitsRotated} highlighted_ids={highlighted_cells} shitIsHovering={shitIsHovering} setHighlight_ids={(ids) => setHighlighted_cells(ids)} setShitIsHovering={(bool) => setShitIsHovering(bool)} placedShits={placedShits} setPlacedShits={(addedShit) => setPlacedShits([...placedShits, addedShit])} />;
      })
    );
  });

  return (
    <div>
      <div className='board1 flex flex-wrap mx-auto'>
        {cells}
      </div>
      <button className='rotateShits bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded m-4' type="button" onClick={() => setShitsRotated(!shitsRotated)}>Rotate shits</button>
      <div className={`board1Shits mt-4 flex ${shitsRotated ? 'flex-row' : 'flex-col'} border`}>
        {ShitTypes.map(({ name, length, placed }, i) => {
          return <Shit key={name} name={name} length={length} placed={placed} shitsRotated={shitsRotated} setShitIsHovering={(bool) => setShitIsHovering(bool)} />
        })}
      </div>

    </div>

  );
}

export default Board1;