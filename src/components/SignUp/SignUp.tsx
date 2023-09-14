import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp } from "../../features/singUpSlice";
import { AppDispatch, RootState } from "../../app/store";
import style from "./SingUp.module.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const SignUp = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [blur, setBlur] = useState(false);
  const error = useSelector((state:RootState)=> state.signUpSlice.error)as string | null
  const dispatch = useDispatch<AppDispatch>()
  const handleSingUp = (e: FormEvent) => {
    e.preventDefault();
    setLogin("");
    setPassword("");
    setBlur(false);
    dispatch(authSignUp({_id: "", login, password}))
  };

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);

  };

  const handleSetPass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    

  };

  const hendleBlur = () => {
    setBlur(true);
  };

  if(error){
    return <div>{error}</div>
  }
  return (
    <div className={style.container}>
      <div className={style.form__signup}>
        <Link className={style.home__btn} to="/">
        <button className={style.home__img} ><AiOutlineHome/></button>
        </Link>
        <h1 className={style.h1}>SingUp Form</h1>
        <form onSubmit={handleSingUp}>
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
          <button type="submit" className={style.button}>SingUp</button>
        </form>
        <p className={style.p}>
          have an account?{" "}
          <Link className={style.a} to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
