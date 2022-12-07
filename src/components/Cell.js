import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import uuid from 'react-uuid';
import Shit from './Shit';

const Cell = ({ id, shitsRotated, highlighted_ids, setHighlight_ids, shitIsHovering, setShitIsHovering, placedShits, setPlacedShits, reportPlacedShits }) => {

    const [position_id_placed, setPosition_id_placed] = useState(0);
    const [invalidPlacement, setInvalidPlacement] = useState(false)

    const moveShit = (length, name, placed) => {
        reportPlacedShits();
        let shitToBeMovedInfo = { location: position_id_placed, name: name, length: length, rotated: shitsRotated, placed: true };
        // if shit is already one on the board
        var newPlacedShits = [...placedShits];
        // if (placed) {
        //     // remove existing one from placedShits
        //     newPlacedShits = placedShits.filter((obj) => {
        //         return obj.name !== name;
        //     });
        // }
        console.log(placedShits)
        setPlacedShits([...newPlacedShits, shitToBeMovedInfo]);
    }

    const canDrop = () => {
        if (invalidPlacement) return false;
        // if highlighted id intercepts shit already on board
        return true;
    }

    const highlight = (length, initCursorCord, initShitCord) => {
        setInvalidPlacement(() => false);
        let offset;
        // first = 0
        let position;
        // determine where cursor is relative to shit
        if (shitsRotated) { // vertical
            offset = initCursorCord.y - initShitCord.y;
            position = Math.trunc(offset / 40);
        } else { // horizontal
            offset = initCursorCord.x - initShitCord.x;
            position = Math.trunc(offset / 40);
        }
        // use length and rotation to highlight appropriate cells
        const arr_highlighted_ids = [];
        for (var i = 0; i < length; i++) {
            if (shitsRotated) {
                let other_cell_pos = (id + (i * 10) - (position * 10));
                /* Checking if the highlighted cells go off board on top and bottom */
                if ((other_cell_pos > 199) || (other_cell_pos < 100)) {
                    setInvalidPlacement(() => true);
                }
                else arr_highlighted_ids.push(other_cell_pos)
            }
            else {
                /* Checking if the highlighted cells are on the same row. */
                if ((Math.trunc((id + i - position) / 10) % 10) !== Math.trunc((id / 10) % 10)) {
                    // debugging
                    setInvalidPlacement(() => true);
                }
                else arr_highlighted_ids.push(id + i - position);
            }
        }
        if (shitsRotated) setPosition_id_placed(id - (position * 10))
        else setPosition_id_placed(id - position);

        setHighlight_ids(arr_highlighted_ids);
        setShitIsHovering(true);
    }

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'shit',
        drop: (item) => moveShit(item.length, item.name, item.placed),
        canDrop: (item, monitor) => canDrop(),
        hover: (item, monitor) => highlight(item.length, monitor.getInitialClientOffset(), monitor.getInitialSourceClientOffset()),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [shitsRotated, position_id_placed])

    return <div className="cell" id={id} ref={dropRef}>
        {(isOver || (shitIsHovering && highlighted_ids && highlighted_ids.includes(id))) && (
            <div
                style={{
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                }}
            ></div>
        )}
        {placedShits && placedShits.map(({ location, name, length, rotated }, i) => {
            if (location === id)
                return <Shit key={uuid()} name={name} length={length} placed={true} shitsRotated={rotated} setShitIsHovering={(bool) => setShitIsHovering(bool)} />
            else return null;
        })}
    </div>;

}

export default Cell;