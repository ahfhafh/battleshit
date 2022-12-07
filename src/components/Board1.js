import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import Cell from './Cell';
import Shit from './Shit';
import { useDrop } from 'react-dnd';

const BOARD_size_x = 10;
const BOARD_size_y = 10;

const Board1 = () => {
  const [board1, setBoard1] = useState(() => {
    let cells = [];
    for (var x = 0; x < BOARD_size_x; x++) {
      var col = [];
      for (var y = 0; y < BOARD_size_y; y++) {
        col.push(0);
      }
      cells[x] = col;
    }
    return cells;
  });

  const [availableShits, setAvailableShits] = useState([
    {
      name: 'carrier1',
      length: 5,
      placed: false,
    },
    {
      name: 'battleship1',
      length: 4,
      placed: false,
    },
    {
      name: 'cruiser1',
      length: 3,
      placed: false,
    },
    {
      name: 'submarine1',
      length: 3,
      placed: false,
    },
    {
      name: 'destroyer1',
      length: 2,
      placed: false,
    },
  ]);
  const [highlighted_cells, setHighlighted_cells] = useState([]);
  const [shitIsHovering, setShitIsHovering] = useState(false);
  const [shitsRotated, setShitsRotated] = useState(false);
  const [placedShits, setPlacedShits] = useState([]);

  useEffect(() => {
    console.log(placedShits);
    // let latestPlacedShit = placedShits.at(-1);
    // if (latestPlacedShit) {
    //   // change board state with added shit
    //   setBoard1((board1) => board1.map((row, rowIndex) => {
    //     const newRow = row.map((col, colIndex) => {
    //       if ((rowIndex * 10 + colIndex + 100) === latestPlacedShit.location) { return latestPlacedShit }
    //       else return col;
    //     })
    //     return newRow;
    //   }));

    //   // remove shit from available box
    //   setAvailableShits((availableShits) =>
    //     availableShits.filter((obj) => {
    //       return obj.name !== latestPlacedShit.name;
    //     })
    //   )
    // }
  }, [placedShits])

  useEffect(() => {
    console.log(board1)
  }, [board1]);

  // useEffect(() => {
  //   console.log(placedShits)
  // }, [placedShits]);

  // remove from placedShits and return it to availableShits
  const returnShit = (name, length, placed) => {
    // console.log(name + ' returned')
    // if (placed) {
    //   // remove existing one from placedShits
    //   setPlacedShits(() => placedShits.filter((obj) => {
    //     return obj.name !== name;
    //   }));
    //   // return it to available box
    //   console.log(availableShits)
    //   setAvailableShits(() => [...availableShits, { name: name, length: length, placed: false }])
    // }
  }

  const [, dropRef] = useDrop(() => ({
    accept: 'shit',
    drop: (item) => returnShit(item.name, item.length, item.placed),
  }), [availableShits])

  const handle_setHighlight_ids = (ids) => {
    setHighlighted_cells(() => ids);
  }

  const handle_setShitIsHovering = (bool) => {
    setShitIsHovering(() => bool);
  }

  const handle_setPlacedShits = (shits) => {
    setPlacedShits(shits);
  }

  const handleReportPlacedShits = () => {
    console.log(placedShits);
  }

  const cells = board1.map((row, rowIndex) => {
    return (
      row.map((col, colIndex) => {
        return <Cell key={rowIndex * 10 + colIndex + 100} id={rowIndex * 10 + colIndex + 100} shitsRotated={shitsRotated} highlighted_ids={highlighted_cells} shitIsHovering={shitIsHovering} setHighlight_ids={(ids) => handle_setHighlight_ids(ids)} setShitIsHovering={(bool) => handle_setShitIsHovering(bool)} placedShits={placedShits} setPlacedShits={(shits) => handle_setPlacedShits(shits)} reportPlacedShits={() => handleReportPlacedShits()} />;
      })
    );
  });

  return (
    <div>
      <div className='board1 flex flex-wrap mx-auto'>
        {cells}
      </div>
      <button className='rotateShits bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded m-4' type="button" onClick={() => setShitsRotated(!shitsRotated)}>Rotate shits</button>
      <div className={`board1Shits mt-4 flex ${shitsRotated ? 'flex-row' : 'flex-col'} border`} ref={dropRef}>
        {availableShits.map(({ name, length, placed }, i) => {
          return <Shit key={uuid()} name={name} length={length} placed={placed} shitsRotated={shitsRotated} setShitIsHovering={(bool) => handle_setShitIsHovering(bool)} />
        })}
      </div>

    </div>

  );
}

export default Board1;