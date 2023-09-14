import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postComment, removeComment } from "../../features/ideasSlice";
import style from "./Ideas.module.css";
import stringHash from "string-hash";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";

const Ideas = () => {
  const [commentText, setCommentText] = useState("");
  const comments = useSelector((state: RootState) => state.ideas.comments);
  const dispatch = useDispatch<AppDispatch>();
  const userLogin = useSelector((state: RootState) => state.auth.user.login);
  const token = useSelector((state: RootState) => state.ideas.token);

  const handleCommentSubmit = async () => {
    await dispatch(postComment({ commentText, author: { login: userLogin } }));
    setCommentText("");
  };

  const handleRemove = (commentId: string) => {
    dispatch(removeComment({ commentId }));
  };

  // useEffect(() => {
  //     dispatch();

  //   }, [ dispatch]);

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
          Сортировать по: {/* Добавьте здесь кнопки для сортировки */}
        </div>
      </div>
      <div className={style.todos}>
        <ul className={style.todos__ul}>
          {comments.map((comment, index) => (
            <div key={index} className={style.comment}>
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
              </div>
              <div className={style.comment__inner}>
                <p>{comment.text}</p>
                {userLogin !== comment.username ? (
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
            </div>
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
