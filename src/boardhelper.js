class Board {
    constructor() {
        this.cells = [];
        this.size_x = 10;
        this.size_y = 10;

        for (var x = 0; x < this.size_x; x++) {
            var col = [];
            for (var y = 0; y < this.size_y; y++) {
                col.push(0);
            }
            this.cells[x] = col;
        }
    }

    // setPositions() {
    //     this.cells.forEach((row, rowIndex) => {
    //         row.forEach((tile, columnIndex) => {
    //             tile.oldRow = tile.row;
    //             tile.oldColumn = tile.column;
    //             tile.row = rowIndex;
    //             tile.column = columnIndex;
    //             tile.markForDeletion = false;
    //         });
    //     });
    // }

    // clearShits() {
    //     this.tiles = this.tiles.filter((tile) => tile.markForDeletion === false);
    //     this.tiles.forEach((tile) => {
    //         tile.markForDeletion = true;
    //     });
    // }

    // hasWon() {
    //     return this.won;
    // }

    // hasLost() {
    //     var canMove = false;
    //     for (var row = 0; row < this.size_x; ++row) {
    //         for (var column = 0; column < this.size_y; ++column) {
    //             canMove |= this.cells[row][column].value === 0;
    //             for (var dir = 0; dir < 4; ++dir) {
    //                 var newRow = row + this.deltaX[dir];
    //                 var newColumn = column + this.deltaY[dir];
    //                 if (
    //                     newRow < 0 ||
    //                     newRow >= this.size ||
    //                     newColumn < 0 ||
    //                     newColumn >= this.size
    //                 ) {
    //                     continue;
    //                 }
    //                 canMove |=
    //                     this.cells[row][column].value ===
    //                     this.cells[newRow][newColumn].value;
    //             }
    //         }
    //     }
    //     return !canMove;
    // }
}

export { Board };