import Container from "../components/Container";
import { Header } from "../components/Header";

export default async function BlogTopbar() {
  return (
    <section>
      <Container>
        <Header
          title="Baza wiedzy"
          subtitle="Znajdziesz tu praktyczne porady i aktualności dotyczące serwisu opon, wymiany sezonowej oraz dbania o bezpieczeństwo na drodze. Dzielimy się wiedzą, aby Twoja codzienna jazda była wygodna, ekonomiczna i bezpieczna."
        />
      </Container>
    </section>
  );
}
