import React from 'react';
import { useDrop } from 'react-dnd';

const Cell = ({ id, shitsRotated, highlighted_ids, setHighlight_ids, shitIsHovering, setShitIsHovering }) => {

    const moveShit = (length, name, initCursorCord, dropResult) => {
        // determine where cursor is relative to shit
        // use length and rotation to place in appropriate cells
    }

    const highlight = (length, initCursorCord, initShitCord) => {
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
            if (shitsRotated) { arr_highlighted_ids.push(id + (i * 10) - (position * 10)) }
            else { arr_highlighted_ids.push(id + i - position) }
        }
        setHighlight_ids(arr_highlighted_ids);
        setShitIsHovering(true);
    }

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'shit',
        drop: (item, monitor) => moveShit(item.length, item.name, monitor.getInitialClientOffset()),
        hover: (item, monitor) => highlight(item.length, monitor.getInitialClientOffset(), monitor.getInitialSourceClientOffset()),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [shitsRotated])

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
    </div>;

}

export default Cell;