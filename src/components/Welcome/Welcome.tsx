import { Link } from "react-router-dom";
import "./Welcome.scss";
import { getApiKeyToLocalStorage } from "../utils/utils";

const Welcome: React.FC = () => {
  const handleClick = () => {
    //loginUser(getApiKeyToLocalStorage) // под вопросом
  };
  return (
    <>
      <div className="welcome">
        <h1 className="welcome__greatings">Вы успешно зарегистрировались!</h1>
        <Link className="link " to={`/sign-in`}>
          <button className="welcome__button" onClick={handleClick}>
            Войти
          </button>
        </Link>
      </div>
    </>
  );
};
export default Welcome;
