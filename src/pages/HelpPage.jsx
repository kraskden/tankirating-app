import { useEffect, useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";
import { UncontrolledOptionRadio } from "../components/control/OptionRadio";
import { getUserLanguage } from "../util/lang";
import { RuDonate } from "../components/donate/RuDonate.jsx";
import { EnDonate } from "../components/donate/EnDonate.jsx";

const languages = [
  {
    name: 'en',
    title: 'En',
    help: EnDonate
  },
  {
    name: 'ru',
    title: 'Ru',
    help: RuDonate
  }
]


export function HelpPage() {

  const [lang, setLang] = useState(languages.find(l => l.name === getUserLanguage()) || languages[0])

  const Help = lang.help
  return (
    <Container fluid='md mt-2'>
      <Card className="mb-5">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <div className="mr-auto">
              <UncontrolledOptionRadio item={lang} items={languages} onChange={setLang} />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p className="fs-3 mb-0">{lang.name === 'ru' ? 'Проекту нужна твоя помощь!' : 'TankiRating is needed your help!'}</p>
            </div>
            <div className="invisible">
              <UncontrolledOptionRadio item={lang} items={languages} onChange={setLang} />
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Help />
        </Card.Body>
      </Card>
    </Container>
  )
}