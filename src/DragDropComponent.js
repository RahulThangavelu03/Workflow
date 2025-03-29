import React, { useRef, useCallback } from 'react';
import { useEffect, useState } from 'react';
import {
  ReactFlow,
  
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from '@xyflow/react';
 

import '@xyflow/react/dist/style.css';
 
 
import Sidebar from "./SideBar"
import { useDnD } from './DnDContext';
 
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];
 
let id = 0;
const getId = () => `dndnode_${id++}`;
 
function DragDropComponent ()  {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const [selectedNode, setSelectedNode] = useState(null);
  const [EditText,setEditText] = useState()


  console.log(nodes,"nodes=========111"
  )
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
 
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
 
      if (!type) {
        return;
      }
 
    
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` ,description:"default description"},
      };
 
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );
 

  const onNodeClick = useCallback((event, node) => {


    setSelectedNode(node); 

    
  }, []);

  const deleteSelectedNode = () => {

    if (selectedNode) {
      setNodes((nodes) => nodes.filter((i) => i.id !== selectedNode.id)); 
      setSelectedNode(null); 
    }
    else{
      alert("No Node selected")
    }
  };


  const updateNodeData = (nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node))
    );
  };


  useEffect(() => {
    const savedNodes = JSON.parse(localStorage.getItem('workflow_nodes'));
    const savedEdges = JSON.parse(localStorage.getItem('workflow_edges'));

    if (savedNodes && savedEdges) {
      setNodes(savedNodes);
      setEdges(savedEdges);
    }
  }, [setNodes, setEdges]);


  const saveWorkflow = () => {
    localStorage.setItem('workflow_nodes', JSON.stringify(nodes));
    localStorage.setItem('workflow_edges', JSON.stringify(edges));
    alert('Workflow Saved Successfully!');
  };



  const loadWorkflow = () => {
    const savedNodes = JSON.parse(localStorage.getItem('workflow_nodes'));
    const savedEdges = JSON.parse(localStorage.getItem('workflow_edges'));

    if (savedNodes && savedEdges) {
      setNodes(savedNodes);
      setEdges(savedEdges);
      alert('Workflow Loaded Successfully!');
    } else {
      alert('No saved workflow found.');
    }
  };


 return (
    <div className="dndflow">
      <div className="reactflow-wrapper" style={{height:"400px",width:"400px"}} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          fitView
          style={{ width: "100%", height: "100%", backgroundColor: "#F7F9FB"  }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar deleteSelectedNode={deleteSelectedNode}  selectedNode={selectedNode}  setSelectedNode={setSelectedNode}
        updateNodeData={updateNodeData} saveWorkflow={saveWorkflow} loadWorkflow = {loadWorkflow}  />

   </div>
  );
};
 export default DragDropComponent