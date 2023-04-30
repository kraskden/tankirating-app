import Captcha from '@stadline/react-mtcaptcha';
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


export function CaptchaModal({ onResult }) {

    const [captcha, setCaptcha] = useState()

    function onSubmit(e) {
        e.preventDefault()
        onResult(captcha)
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Captcha verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Captcha onVerified={state => setCaptcha(state.verifiedToken)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onResult}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onResult(captcha)} disabled={!captcha}>
                    Verify
                </Button>
            </Modal.Footer>
        </>
    )
}