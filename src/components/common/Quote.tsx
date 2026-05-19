import { quotes } from '@/config/Quote';

import Container from './Container';

function getQuoteIndex() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      86400000,
  );
  return dayOfYear % quotes.length;
}

export const Quote = () => {
  const { quote, author } = quotes[getQuoteIndex()];

  return (
    <Container className="py-20">
      <figure className="text-center">
        <blockquote className="text-muted-foreground text-[15px] leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="text-foreground/60 mt-3 text-[13px] font-medium">
          — {author}
        </figcaption>
      </figure>
    </Container>
  );
};
