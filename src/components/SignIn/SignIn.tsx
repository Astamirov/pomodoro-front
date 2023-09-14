import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignIn } from "../../features/signInSlice";
import { AppDispatch, RootState } from "../../app/store";
import style from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [blur, setBlur] = useState(false);

  const token = useSelector((state: RootState) => state.signInSlice.token);
  const error = useSelector((state: RootState) => state.signInSlice.error) as
    | string
    | null;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSingUp = (e: FormEvent) => {
    e.preventDefault();
    dispatch(authSignIn({ _id: "", login, password }));
  };
  if (token) {
    navigate("/");
  }

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleSetPass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const hendleBlur = () => {
    setBlur(true);
  };

  return (
    <div className={style.container}>
      <div className={style.form__signup}>
        <Link className={style.home__btn} to="/">
          <button className={style.home__img} ><AiOutlineHome/></button>
        </Link>
        <h1 className={style.h1}>Login Form</h1>
        <form onSubmit={handleSingUp}>
          {error ? <div className={style.err_log}>{error}</div> : null}
          <h4 className={style.h4}>Username</h4>
          <input
            onBlur={hendleBlur}
            className={blur && !login ? style.input__err : style.input}
            onChange={handleSetName}
            value={login}
            type="text"
            name=""
            id=""
          />
          <h4 className={style.h4}>Password</h4>
          <input
            onBlur={hendleBlur}
            className={blur && !password ? style.input__err : style.input}
            onChange={handleSetPass}
            value={password}
            type="password"
          />
          <button type="submit" className={style.button}>
            Login
          </button>
        </form>
        <p className={style.p}>
          Don`t have an account?{" "}
          <Link className={style.a} to="/auth">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
