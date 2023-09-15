import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadComments,
  postComment,
  removeComment,
} from "../../features/ideasSlice";
import style from "./Ideas.module.css";
import stringHash from "string-hash";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";

const Ideas = () => {
  const [commentText, setCommentText] = useState("");
  const comments = useSelector((state: RootState) => state.ideas.comments);
  const dispatch = useDispatch<AppDispatch>();
  const userLogin = useSelector(
    (state: RootState) => state.signInSlice.user.login
  );
console.log(userLogin)
  const [sortType, setSortType] = useState("latest");
  const token = useSelector((state: RootState) => state.ideas.token);
  const handleCommentSubmit = async () => {
    await dispatch(postComment({ commentText, author: { login: userLogin } }));
    setCommentText("");
  };

  const handleRemove = (commentId: string) => {
    dispatch(removeComment({ commentId }));
  };

  const handleSortByLatest = () => {
    setSortType("latest");
  };

  const handleSortByOldest = () => {
    setSortType("oldest");
  };

  const sortedComments = [...comments]; // Создаем копию комментариев, чтобы не изменять оригинальный массив

  if (sortType === "latest") {
    sortedComments.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortType === "oldest") {
    sortedComments.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  useEffect(() => {
    dispatch(loadComments());
  }, [dispatch, commentText, sortType]);

  const formatDateTime = (isoDate) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(isoDate).toLocaleDateString("en-US", options);
  };

  return (
    <div className={style.ideas}>
      <div className={style.ideas__top}>
        <div className={style.ideas__nav}>
          <div className={`${style.navLink} ${style.navLink__new}`}>Новое</div>
          <div className={`${style.navLink} ${style.navLink__made}`}>
            Сделано
          </div>
        </div>
        <div className={style.sort}>
          Сортировать по:
          <button
            className={style.sortBtn}
            onClick={handleSortByLatest}
            autoFocus
          >
            Новые
          </button>
          <button className={style.sortBtn} onClick={handleSortByOldest}>
            Старые
          </button>
        </div>
      </div>
      <div className={style.todos}>
        <ul className={style.todos__ul}>
          {sortedComments.map((comment, index) => (
            <li key={index} className={style.comment}>
              <div className={style.comment__user}>
                <div
                  className={style.user__avatar}
                  style={{
                    backgroundColor: `#${(
                      stringHash(comment.username || "") % 0xfffffa
                    ).toString(15)}`,
                  }}
                >
                  {comment.username ? comment.username[0].toUpperCase() : ""}
                </div>
                <h4 className={style.user__name}>
                  {comment.username || "Автор неизвестен"}
                </h4>
                <div className={style.comment__date}>
                  {formatDateTime(comment.date)}
                </div>
              </div>
              <div className={style.comment__inner}>
                <p>{comment.text}</p>
                {userLogin === comment.username ? (
                  <button
                    className={style.removeBtnComment}
                    onClick={() => handleRemove(comment._id)}
                  >
                    ❌
                  </button>
                ) : (
                  ""
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {!token ? (
        <p>
          Оставлять комментарии могут только авторизованные пользователи,{" "}
          <Link to="/login">aвторизоваться?</Link>
        </p>
      ) : (
        <>
          <input
            className={style.inputCom}
            type="text"
            placeholder="Введите комментарий"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className={style.addComBtn} onClick={handleCommentSubmit}>
            Добавить комментарий
          </button>
        </>
      )}
    </div>
  );
};

export default Ideas;
