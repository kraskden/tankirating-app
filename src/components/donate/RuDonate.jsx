import { Alert, Card } from "react-bootstrap";
import { DonatePremiumBadge } from "./PremiumBadge.jsx";

export function RuDonate() {

    return (
        <>
            <p className="fs-5">
                Конец 2024 года ознаменовался не самой приятной новостью для меня - проект TankiRating лишается VPS сервера, на котором он хостится.
                Все эти годы его бесплатно предоставлял игрок <b>rm-rf</b>, но все хорошее подходит к концу.
            </p>
            <p className="fs-5">
                <Alert className="text-center">
                    <b> Для оплаты хостинга и домена требуется порядка 8000 российских рублей в год.</b>
                </Alert>
            </p>
            <p className="fs-5">
                Прошу помочь проекту кто сколько сможет. Самому платить все эти деньги желания нету, да и в ТО я уже давно особо не играю. Так что, можно сказать, судьба проекта в ваших руках!
            </p>

            <p className="h3 mt-4">
                Как задонатить?
            </p>
 
            <ul>
                <li><span className="fs-5"><a href="https://boosty.to/tankirating/single-payment/donation/662838/target?share=target_link">Через Boosty</a></span></li>
                <li><span className="fs-5">Переводом на карту МИР: 9112 3820 5068 0469</span></li>
            </ul>

            <p className="h3 mt-4">
                Бонусы за донат
            </p>

            <p className="fs-5">
                Задонатившим по желанию присвою статус <DonatePremiumBadge/> на портале - пользователи с этим статусом обновляются чаще, чем в статусе Aсtive вне зависимости от их игровой активности. 
                Для получения статуса нужно скинуть подтверждение доната с никнеймом на почту <a href="mailto:kdby@riseup.net" className="href">kdby@riseup.net</a>
            </p>
        </>
    )
}