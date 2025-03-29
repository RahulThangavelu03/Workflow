import React from 'react';
import { useState,useEffect } from 'react';
import { useDnD } from './DnDContext';
 
export default ( { deleteSelectedNode , selectedNode,  setSelectedNode, 
  updateNodeData,  saveWorkflow, loadWorkflow }) => {
  const [_, setType] = useDnD();

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');


 
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data?.label || '');
      setDescription(selectedNode.data?.description || '');
    }
  }, [selectedNode]);
 

  const handleUpdate = (e, field) => {
    const value = e.target.value;
    
    if (selectedNode) {
      
      const updatedNode = { ...selectedNode, data: { ...selectedNode.data, [field]: value } };

 setSelectedNode(updatedNode); 
    updateNodeData(selectedNode.id, updatedNode.data);
    }
  };


 
  return (
    <aside  style={{ width: "250px", padding: "10px", border: "1px solid #ccc", background: "#f9f9f9" }}>
      <div className="description">You can drag these nodes to the pane on the right.</div><br/>
      
      <div className="dndnode " style={{border: "1px solid black"}} onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Start Node
      </div><br/>
      <div className="dndnode" style={{border: "1px solid black"}} onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Process Node
      </div><br/>
      <div className="dndnode output" style={{border: "1px solid black"}} onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Decission Node
      </div><br/>
      <div className="dndnode Delete"  style={{border: "1px solid black"}}onClick={(e)=>deleteSelectedNode()}>
        Delete Node
      </div>
      

      {selectedNode && (
        <div className="edit-panel">
          <h3>Edit Node</h3>
          <label>Label:</label>
          
          <input type="text" value={selectedNode?.data?.label || ''} onChange={(e) => handleUpdate(e, 'label')} />



          <label>Description:</label>
          
<input type="text" value={selectedNode?.data?.description || ''} onChange={(e) => handleUpdate(e, 'description')} />

          <button onClick={handleUpdate}>Update</button>
        </div>
      )}



<div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px" }}>
        <button onClick={saveWorkflow} style={{ marginRight: "5px" ,  backgroundColor: '#007bff' }}>Save</button>
        <button onClick={loadWorkflow} style={{ backgroundColor: '#28a745'}}>Load</button>
      </div>

      
    </aside>
  );
};