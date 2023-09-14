import React, { useEffect, useState } from "react";
import style from "./Todos.module.css";
import { FaClipboardList, FaPlus, FaMinus } from "react-icons/fa";
import { HiOutlineDotsHorizontal, HiBookmark } from "react-icons/hi";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineDoneOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  addTodo,
  fetchTodo,
  fetchCateg,
  updateCount,
  updateCompleted,
  removeTodo,
} from "../../features/todosSlice";
import { useTranslation } from "react-i18next";



const Todos = () => {
  const todos = useSelector((state: RootState) => state.todosReducer.todos);
  const categ = useSelector((state: RootState) => state.todosReducer.category);
  // const error = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch<AppDispatch>();
  const [category, setCategory] = useState("65007b007f366df54791f258");
  const [text, setText] = useState("");
  const [count, setCount] = useState(1);
  const { t, i18n } = useTranslation();


  useEffect(() => {
    dispatch(fetchTodo());
    dispatch(fetchCateg());
    dispatch(updateCount());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({ category, text }));
    }
    setText("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleCount = (_id: string) => {
    const updatedTodo = todos.find((todo) => todo._id === _id);
    if (updatedTodo) {
      const newCount = updatedTodo.count + 1;
      dispatch(updateCount({ _id, count: newCount }));
    }
  };
  const handleCountInc = (_id: string) => {
    const updatedTodo = todos.find((todo) => todo._id === _id);
    if (updatedTodo) {
      const newCount = updatedTodo.count - 1;
      dispatch(updateCount({ _id, count: newCount }));
    }
  };
  const handleCompleted = (_id: string, completed: boolean) => {
    dispatch(updateCompleted({ _id, completed }));
  };
  const handalRemove = (_id: string): void => {
    dispatch(removeTodo(_id));
  };

  return (
    <div className={style.todos_form}>
      <h4 className={style.title}>{t("planned")}</h4>
      <div className={style.todos}>
        <form className={style.form__add} onSubmit={(e) => handleSubmit(e)}>
          <select
            onChange={handleChange}
            placeholder={t('category')}
            className={style.select}
            name=""
          >
            
            {categ
              .map((item) => {
                return (
                  
                  <option key={item._id} value={item._id}>{item.category}</option>
                  
                  );
                })
              .reverse()}
          </select>
          <input
            value={text}
            onChange={handleChangeText}
            className={style.input}
            placeholder={t('description')}
            type="text"
          />
          <button title="Добавить" className={style.add}>
            <FaPlus />
          </button>
        </form>
        <button title="Планирование" type="submit" className={style.plan}>
          <HiBookmark />
        </button>
      </div>
      <div className={style.margin}>
        {todos
          .map((todo) => {
            return (
              <div key={todo._id} className={style.todo__list}>
                <div  className={style.list}>
                  <div className={style.category}>
                    {todo.category && todo.category.category}
                  </div>
                  <div className={style.text}>{todo.text}</div>
                  <button
                    title="Добавить"
                    onClick={() => handleCount(todo._id)}
                    className={style.count}
                  >
                    {todo.count}
                  </button>
                </div>
                <button
                  onClick={() => handleCompleted(todo._id, todo.completed)}
                  title="Прочее"
                  className={style.icon__list2}
                >
                  <HiOutlineDotsHorizontal />
                </button>
                {todo.completed ? (
                  <div className={style.setting__todo}>
                    <button onClick={() => handleCount(todo._id)}><FaPlus /> Добавить</button>
                    <button onClick={() => handleCountInc(todo._id)}><FaMinus /> Убрать один</button>
                    <hr />
                    <button><MdOutlineDoneOutline/> Указать как выполнено</button>
                    <button onClick={()=> handalRemove(todo._id)}><AiTwotoneDelete/> Удалить</button>
                  
                    </div>
                ) : null}
              </div>
            );
          })
          .reverse()}
          {todos.length === 0 ? <p className={style.text__todos}>
          <span>
            <a className={style.icon__list} href="#">
              <FaClipboardList />
            </a>
        {t("todo")}.
          </span>
          <br />
          {t("try")}
        </p> : null}
    
      </div>
      <hr />
    </div>
  );
};

export default Todos;
