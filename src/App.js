import React, { useRef, useCallback } from 'react';
import { useEffect, useState } from 'react';

import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
  import { DnDProvider, useDnD } from './DnDContext';
 import DragDropComponent from './DragDropComponent';
 
function App (){


  return (

    (
      <ReactFlowProvider>
        <DnDProvider>
          <DragDropComponent />
        </DnDProvider>
      </ReactFlowProvider>
    )
  )
}
export default App