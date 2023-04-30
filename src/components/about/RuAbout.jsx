import { Link } from "react-router-dom";
import { AboutPictures } from "./AboutPictures";

export function RuAbout() {
  return (
    <>
      <p className="fs-5">
        TankiRating — портал с игровой статистикой для игры "Танки Онлайн".
        Данный сайт не имеет ничего общего с официальными ресурсами игры и является лишь фан-проектом.
        <br />
        В данный момент на портале открыта свободная регистрация.
      </p>
      <p className="fs-5">
        Главное предназначение этого портала — возможность просмотра игровых данных "в динамике".
        В отличии от <a href="https://ratings.tankinline.com">официального сайта рейтингов</a>, на портале можно
        посмотреть игровую активность и эффективность пользователя за различные промежутки времени, а также
        наблюдать за их изменениями на различных графиках.
        <br />
      </p>
      <p className="fs-5">
        Просто зайди на <Link to="/">главную страницу</Link>, и изучай функциональность самостоятельно!
      </p>

      <p className="h3 mt-4">
        Галерея
      </p>

      <AboutPictures />

      <p className="h3 mt-4">
        Структура портала
      </p>

      <ul className="ms-4">
        <li><span className="fs-5"><Link to="/">Главная страница</Link> — рейтинг зарегистрированных пользователей</span></li>
        <li><span className="fs-5"><Link to="/user/Fizzika">Профиль пользователя</Link> — информация о игроке</span></li>
        <li><span className="fs-5"><Link to="/trends">Тренды</Link> — статистика по всем игрокам-легендам</span></li>
        <li><span className="fs-5"><Link to="/online">OnlineHub</Link> — график онлаена!!111 К сожалению, только архивные данные, спасибо альтернативе гамез</span></li>
      </ul>

      <p className="h3 mt-4">
        Контакты
      </p>
      <p className="fs-5">
        Если ты сменил никнейм, хочешь удалить/заморозить свой аккаунт на портале, ну или просто есть что сказать:
      </p>
      <ul className="ms-4">
        <li><span className="fs-5">Написать личное сообщение пользователю <b>Fizzika</b> на <a href="https://ru.tankiforum.com/messenger/compose/?to=808" className="href">официальном форуме игры</a> (предпочтительный способ)</span></li>
        <li><span className="fs-5">Электронная почта <a href="mailto:kdby@riseup.net" className="href">kdby@riseup.net</a></span></li>
      </ul>

      <p className="h3 mt-4">
        <a name="source">Исходный код, документация</a>
      </p>

      <p className="fs-5">TankiRating это бесплатный и открытый проект с открытым исходным кодом и общедоступным API</p>

      <ul className="ms-4">
        <li><span className="fs-5"> <a target="_blank" rel="noopener noreferrer" href="https://github.com/kraskden/tankirating-app" className="href">Client source</a></span></li>
        <li><span className="fs-5"> <a target="_blank" rel="noopener noreferrer" href="https://github.com/kraskden/tankirating-api" className="href">API source</a></span></li>
        <li><span className="fs-5"> <a target="_blank" rel="noopener noreferrer" href="https://tankirating.org/api/swagger-ui/index.html" className="href">API documentation</a></span></li>
      </ul>

    </>
  )
}