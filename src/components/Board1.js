import React, { useState } from 'react';
import Cell from './Cell';
import { Board } from "../boardhelper";
import { useDrag } from 'react-dnd';

const ShitTypes = [
  {
    name: 'carrier',
    length: 5,
    placed: null,
  },
  {
    name: 'battleship',
    length: 4,
    placed: null,
  },
  {
    name: 'cruiser',
    length: 3,
    placed: null,
  },
  {
    name: 'submarine',
    length: 3,
    placed: null,
  },
  {
    name: 'destroyer',
    length: 2,
    placed: null,
  },
];

const Board1 = () => {
  const [board1, setBoard1] = useState(new Board());

  const cells = board1.cells.map((row, rowIndex) => {
    return (
      row.map((col, colIndex) => {
        return <Cell key={rowIndex * 10 + colIndex + 101} id={rowIndex * 10 + colIndex + 101} />;
      })
    );
  });

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "ShitTypes.name",
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      })
    }),
    []
  )

  const shits = ShitTypes.map(({ name, length, placed }, i) => {
    return (
      <div id={name} key={name} ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1, border: '1px solid black', cursor: 'move', height: `calc(24rem/10)`, width: `calc(24rem/10*${length})`, backgroundColor: 'pink', }}>
      </div>
    )
  });

  return (
    <div className='board1 flex flex-wrap w-96 h-96 mx-auto'>
      {cells}
      {shits}
    </div>
  );
}

export default Board1;