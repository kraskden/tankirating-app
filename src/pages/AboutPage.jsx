import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { EnAbout } from "../components/about/EnAbout";
import { RuAbout } from "../components/about/RuAbout";
import { UncontrolledOptionRadio } from "../components/control/OptionRadio";
import { getUserLanguage } from "../util/lang";

const languages = [
  {
    name: 'En',
    title: 'En',
    about: EnAbout
  },
  {
    name: 'ru',
    title: 'Ru',
    about: RuAbout
  }
]

export function AboutPage() {

  const [lang, setLang] = useState(languages.find(l => l.name === getUserLanguage()) || languages[0])

  const About = lang.about
  return (
    <Container fluid='md mt-2'>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <div className="mr-auto">
              <UncontrolledOptionRadio item={lang} items={languages} onChange={setLang} />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p className="fs-3 mb-0">About portal</p>
            </div>
            <div className="invisible">
              <UncontrolledOptionRadio item={lang} items={languages} onChange={setLang} />
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <About />
        </Card.Body>
      </Card>
    </Container>
  )
}