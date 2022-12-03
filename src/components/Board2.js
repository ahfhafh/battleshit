import React, { useState } from 'react';
import Cell from './Cell';
import { Board } from "../boardhelper";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Board2 = () => {
    const [board2, setBoard2] = useState(new Board());

    const cells = board2.cells.map((row, rowIndex) => {
        return (
            row.map((col, colIndex) => {
                return <Cell key={rowIndex * 420 + colIndex + 201} id={rowIndex * 10 + colIndex + 201}/>;
            })
        );
    });
    return <DndProvider backend={HTML5Backend}>
        <div className='board2 flex flex-wrap w-96 h-96 mx-auto'>
            {cells}
        </div>
    </DndProvider>
}

export default Board2;