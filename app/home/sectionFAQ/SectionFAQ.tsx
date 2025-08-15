import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import { Header } from "@/app/components/Header";
import { FaqAccordion } from "./FaqAccordion";
import { ButtonSettings, FAQData } from "@/type/acf";

interface SectionFAQProps {
  data: FAQData;
  buttonSettings: ButtonSettings;
}

export function SectionFAQ({ data, buttonSettings }: SectionFAQProps) {
  const {
    title,
    subtitle,
    question1,
    answer1,
    question2,
    answer2,
    question3,
    answer3,
    question4,
    answer4,
  } = data;
  const { buttonText, buttonLink } = buttonSettings;

  const items = [
    { question: question1, answer: answer1 },
    { question: question2, answer: answer2 },
    { question: question3, answer: answer3 },
    { question: question4, answer: answer4 },
  ];

  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-col gap-9 justify-center items-center">
          <Header noPaddingY title={title} subtitle={subtitle} />
          <div className="flex flex-col max-w-[1028px]">
            {items.map((item, idx) => (
              <FaqAccordion
                key={idx}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
          <Button label={buttonText} href={buttonLink} />
        </div>
      </Container>
    </section>
  );
}
