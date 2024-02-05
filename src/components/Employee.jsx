import React, { useState, useEffect } from 'react';

export const Employee = ({ data, onEdit, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

  useEffect(() => {
  
    setEditedData({ ...data });
  }, [data]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
   
    onEdit(editedData);


    setEditMode(false);
  };

  const handleDelete = () => {
    
    onDelete();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <p>Employee detail</p>
      <label htmlFor="name">Name</label>
      <input type="text" value={editedData.name || ''} name="name" onChange={handleChange} readOnly={!editMode} />
      <label htmlFor="dob">DOB</label>
      <input type="text" value={editedData.DOB || ''} name="DOB" onChange={handleChange} readOnly={!editMode} />
      <label htmlFor="gender">Gender</label>
      <input type="text" value={editedData.gender || ''} name="gender" onChange={handleChange} readOnly={!editMode} />
      <div>
        {editMode ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};
