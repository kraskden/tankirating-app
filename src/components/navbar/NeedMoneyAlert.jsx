
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { getUserLanguage } from '../../util/lang.js';
import { add, formatISO, parseISO } from 'date-fns';
import { useNavigate } from 'react-router';

const TEXTS = {
    'ru': {
        'heading': "Помоги проекту!",
    },
    'en': {
        'heading': "TankiRating is needed your help!",
    }
}

const ALERT_INTENSITY = {
    'weeks': 1
}

const ALERT_KEY = "alerts.need_money.ignored_at"

export function NeedMoneyAlert() {
    const [show, setShow] = useState(true);
    const lang = getUserLanguage()
    const nav = useNavigate()

    const hideAlert = () => {
        setShow(false)
        localStorage.setItem(ALERT_KEY, formatISO(new Date()))
    }

    const hided_at_str = localStorage.getItem(ALERT_KEY)
    if (hided_at_str != null) {
        const hided_at = parseISO(hided_at_str)
        if (add(hided_at, ALERT_INTENSITY) > new Date()) {
            return null
        } else {
            localStorage.removeItem(ALERT_KEY)
        }
    }

    if (show) {
        return (
            <div className="container-md">
                <Alert className="mt-2 py-2 d-flex" variant="danger" onClick={() => nav('/help')}>
                    <p className='mb-0 text-center flex-grow-1'><b>{TEXTS[lang].heading}</b></p>
                    <button type="button" className="btn-close " aria-label="Close alert" onClick={hideAlert}></button>
                </Alert>
            </div>
        );
    }
}