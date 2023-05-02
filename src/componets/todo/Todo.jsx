import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { completeTodo, removeTodo, updateTodo } from '../../redux/todos/todosSlice';

export default function Todo(props) {
  const dispath = useDispatch();
  const [isEditable, setIsEditable] = useState(false);

  function handleDone(e) {
    dispath(completeTodo({ id: props?.id, completed: e.target.checked }));
  }

  function handleChange(e) {
    dispath(updateTodo({ id: props?.id, title: e.target.value }));
  }

  function handleClick(e) {
    setIsEditable(!isEditable);
  }

  function deleteTodo() {
    dispath(removeTodo(props.id));
  }

  const inputStyle = props.completed
    ? 'focus:outline-none w-full line-through text-red-500'
    : 'focus:outline-none w-full';
  return (
    <div className=" flex items-center gap-3">
      <div>
        <label>
          <input type="checkbox" className=" hidden" onChange={handleDone} />
          <div className=" border-red-500 border-2 rounded-xl h-7 w-7">
            {props.completed && <img src="/image/done.svg" alt="" />}
          </div>
        </label>
      </div>
      <div>
        <input type="text" className={inputStyle} onChange={handleChange} value={props.title} disabled={!isEditable} />
      </div>
      <div onClick={handleClick} className=" cursor-pointer">
        <img className=" w-7 h-7" src="/image/edit.jpg" alt="edit" />
      </div>
      <div>
        <div style={{ background: props.category.color }} className=" text-white px-5 py-2 rounded-large">
          {props.category.name}
        </div>
      </div>
      <div className=" cursor-pointer" onClick={deleteTodo}>
        <img className=" w-10 h-10" src="/image/delete.jpg" alt="" />
      </div>
    </div>
  );
}
