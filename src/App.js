import React from 'react';
import Board1 from './components/Board1';
import Board2 from './components/Board2';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div className='my-48'>
      <header className='text-center mb-12 font-bold text-2xl'>BattleShlt</header>
      <div className="App flex flex-row justify-around mt-8">
        <DndProvider backend={HTML5Backend}>
          <Board1 />
          <Board2 />
        </DndProvider>
      </div>
    </div>

  );
}

export default App;
