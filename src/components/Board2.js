import React, { useState } from 'react';
import Cell from './Cell';
import { Board } from "../boardhelper";

const Board2 = () => {
    const [board2, setBoard2] = useState(new Board());

    const cells = board2.cells.map((row, rowIndex) => {
        return (
            row.map((col, colIndex) => {
                return <Cell key={rowIndex * 420 + colIndex + 201} id={rowIndex * 10 + colIndex + 201} />;
            })
        );
    });
    return <div>
        <div className='board2 flex flex-wrap mx-auto'>
            {cells}
        </div>
    </div>

}

export default Board2;