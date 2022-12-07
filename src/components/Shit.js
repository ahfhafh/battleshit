import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Shit = ({ name, length, placed, shitsRotated, setShitIsHovering }) => {

    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: 'shit',
            item: { length, name, placed },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
            end: () => { setShitIsHovering(false) }
        })
    )


    return (
        <div id={name} ref={dragRef} className={`${placed ? 'm-[-1px]' : 'm-1'} z-10 relative`} style={{ opacity: isDragging ? 0.5 : 1, border: '1px solid black', cursor: 'move', height: shitsRotated ? `calc(40px*${length})` : `40px`, width: shitsRotated ? '40px' : `calc(40px*${length})`, backgroundColor: 'pink', }}>
        </div>
    )
}

export default Shit;