import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, removeCategory, selectCategory } from '../../redux/category/categorySlice';
import { v4 } from 'uuid';
import useOutsideClick from '../../hooks/useOutsideClick';
import { updateCategory } from '../../redux/category/categorySlice';
import { updateTodoCategory } from '../../redux/todos/todosSlice';
import "./style.css"

export default function Categories() {
  const { categories, selectedCategory } = useSelector((state) => state.categories);

  const [isInput, setIsInput] = useState(false);

  const divRef = useRef();

  const dispath = useDispatch();

  useOutsideClick(divRef, () => {
    setIsInput(false);
  });

  function handleDoubleClick() {
    setIsInput(true);
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function createCategory(e) {
    if (e.key == 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      dispath(
        addCategory({
          name: e.target.value,
          color: getRandomColor(),
          id: v4(),
        }),
      );
      e.target.value = '';
    }
  }

  function chooseCategory(value) {
    dispath(selectCategory(value));
  }

  function onChangeCategory(e) {
    dispath(updateCategory({ id: e.target.id, name: e.target.value }));
    dispath(updateTodoCategory({ id: e.target.id, name: e.target.value }));
  }

  function deleteCategory(id) {
    dispath(removeCategory(id));
  }

  return (
    <div className=" text-left">
      <h3 className=" text-3xl font-bold mb-7">Все категории</h3>
      <div ref={divRef}>
        {categories.map((item) => {
          const categoryColor = item?.name === selectedCategory?.name ? item.color : '';
          const categoryStyle =
            item?.name === selectedCategory?.name
              ? ' text-white mb-7 text-3xl py-2 px-3 cursor-pointer rounded-lg transition-all'
              : ' mb-7 text-3xl cursor-pointer transition-all';

          return (
            <div className="category-block">
              <div
                style={{ background: categoryColor }}
                onClick={() => {
                  chooseCategory(item);
                }}
                onDoubleClick={handleDoubleClick}
                className={categoryStyle}
              >
                {isInput ? (
                  <input
                    className=" bg-transparent focus:outline-none"
                    value={item.name}
                    type="text"
                    id={item.id}
                    onChange={onChangeCategory}
                  />
                ) : (
                  item.name
                )}
              </div>
              <div className=" cursor-pointer" onClick={() => deleteCategory(item.id)}>
                <img className=" w-10 h-10" src="/image/delete.jpg" alt="" />
              </div>
            </div>
          );
        })}
      </div>
      <input
        onKeyDown={createCategory}
        type="text"
        className=" text-2xl max-w-xs focus:outline-none"
        placeholder="+ Добавить категорию"
      />
    </div>
  );
}