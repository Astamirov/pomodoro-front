import style from "./Todos.module.css";
import { FaClipboardList} from 'react-icons/fa';
import { TiPlus} from 'react-icons/ti';

const Todos = () => {
  return (
    <div className={style.todos_form}>
      <h4 className={style.title}>ЗАПЛАНИРОВАНО</h4>
      <div className={style.todos}>
        <select placeholder="Категория" className={style.select} name="">
          <option value="1">work</option>
          <option value="2">person</option>
        </select>
        <div>
          <input className={style.input}placeholder="Короткое описаник" type="text" />
          <button className={style.add}>+</button>
        </div>
        <button className={style.plan}>-</button>
      </div>
        <div className={style.list}>
          <p className={style.text__todos}>
           <span><a className={style.icon__list}href="ссылка на Facebook"><FaClipboardList /></a>Список планирования пуст.</span><br /> 
            Попробуйте добавить задачи используя форму выше.
          </p>
        </div>
        <hr />
    </div>
  );
};

export default Todos;
