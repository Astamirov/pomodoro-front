import React, { useEffect, useState } from "react";
import style from "./Todos.module.css";
import { FaClipboardList } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { addTodo, fetchTodo, fetchCateg } from "../../features/todosSlice";

const Todos = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const categ = useSelector((state: RootState) => state.category);
  // const error = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch<AppDispatch>();
  const [category, setCategory] = useState('65007b007f366df54791f258');
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTodo());
    dispatch(fetchCateg());
  }, []);



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({category, text}));
    }
    setText("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={style.todos_form}>
      <h4 className={style.title}>ЗАПЛАНИРОВАНО</h4>
      <div className={style.todos}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <select
            onChange={handleChange}
            placeholder="Категория"
            className={style.select}
            name=""
          >
            {categ.map((item) => {
              return (
                <>
                  <option value={item._id}>{item.category}</option>
                </>
              );
            }).reverse()}
          </select>
          <input
            value={text}
            onChange={handleChangeText}
            className={style.input}
            placeholder="Короткое описание" // Здесь был Мансур.....
            type="text"
          />
          <button className={style.add}>+</button>
        </form>
        <button type="submit" className={style.plan}>
          -
        </button>
      </div>
      <div>
        {todos.map((todo) => {
          return (
            <>
              <div key={todo._id} className={style.list}>
                <div className={style.category}>{todo.category && todo.category.category}</div>
                <div className={style.text}>{todo.text}</div>
                <div className={style.count}>{todo.count}</div>
              </div>
            
            </>
          );
        }).reverse()}
        <p className={style.text__todos}>
          <span>
            <a className={style.icon__list} href="ссылка на Facebook">
              <FaClipboardList />
            </a>
            Список планирования пуст.
          </span>
          <br />
          Попробуйте добавить задачи используя форму выше.
        </p>
      </div>
      <hr />
    </div>
  );
};

export default Todos;
