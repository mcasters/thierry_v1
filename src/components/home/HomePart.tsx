import s from './HomeParts.module.css';

interface Props {
  title: string;
  content: string;
  imageSrc: string;
}
export default function HomePart({ title, content, imageSrc }: Props) {
  return (
    <section className={s.parallaxGroup}>
      <figure className={s.figure}>
        <img src={imageSrc} />
      </figure>
      <article className={s.article}>
        <h1>{title}</h1>
        <p>{content}</p>
      </article>
    </section>
  );
}
