import { Alert, Button, Card } from "react-bootstrap";
import { DonatePremiumBadge } from "./PremiumBadge.jsx";

export function EnDonate() {
    return (
        <>
            <p className="fs-5">
                Sad news appeared in the end of 2024 year - TankiRating lost VPS server, that was used as hosting for the portal.
            </p>
            <p className="fs-5">
                <Alert className="text-center">
                    <b>I need about $80 per year for hosting and domain payments</b>
                </Alert>
            </p>
            <p className="fs-5">
                I ask you to help project as much as you can.  I almost haven't played in the game much lately, so I don't have enought motivation to make all the payments myself.
            </p>

            <p className="h3 mt-4">
                Donate
            </p>

            <p className="fs-5">

                <a href="https://boosty.to/tankirating/single-payment/donation/662838/target?share=target_link">Follow instructions in the Boosty portal</a>
                <br></br>

                <p className="fs-6">If you tried and the system has failed, don't worry, it's all about the sanctions. Thank you for your attempt.</p>
            </p>

            <p className="h3 mt-4">
                Bonuses
            </p>

            <p className="fs-5">
                I'll apply the <DonatePremiumBadge /> status for donators. All users with this status are updated often than users with Active status, no matter of gaming activity.
                Please email me at <a href="mailto:kdby@riseup.net" className="href">kdby@riseup.net</a> with the donation confirmation, if you want.
            </p>
        </>
    )
}