import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Shit = ({ name, length, shitsRotated, setShitIsHovering }) => {

    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: 'shit',
            item: { length, name },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
            end: (item, monitor) => { setShitIsHovering(false) }
        }),
        []
    )


    return (
        <div id={name} key={name} ref={dragRef} className='m-1' style={{ opacity: isDragging ? 0.5 : 1, border: '1px solid black', cursor: 'move', height: shitsRotated ? `calc(40px*${length})` : `40px`, width: shitsRotated ? '40px' : `calc(40px*${length})`, backgroundColor: 'pink', }}>
        </div>
    )
}

export default Shit;