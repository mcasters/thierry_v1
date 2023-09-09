import Image from 'next/image';
import s from '@/styles/Home.module.css';
import Layout from '../components/layout/Layout';
import HomePart from '@/components/home/HomePart';
import HomeContactPart from '@/components/home/HomeContactPart';

export default function Home() {
  const introduction =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Interdum velit laoreet id donec ultrices tincidunt arcu non sodales. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. In fermentum et sollicitudin ac orci phasellus egestas tellus. Tellus in metus vulputate eu scelerisque felis imperdiet. Magna sit amet purus gravida. Urna neque viverra justo nec. Tellus rutrum tellus pellentesque eu tincidunt tortor. Non tellus orci ac auctor augue mauris augue. Odio tempor orci dapibus ultrices in.';
  const presentation =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ligula ullamcorper malesuada proin libero nunc consequat. Eu lobortis elementum nibh tellus molestie nunc non blandit. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Magna fermentum iaculis eu non diam phasellus. Curabitur vitae nunc sed velit. Fringilla phasellus faucibus scelerisque eleifend donec. Gravida quis blandit turpis cursus. Sed libero enim sed faucibus turpis in eu mi. Risus quis varius quam quisque id diam vel quam. Nunc vel risus commodo viverra maecenas accumsan. Enim nec dui nunc mattis. Pulvinar sapien et ligula ullamcorper malesuada proin. Quam nulla porttitor massa id.\n' +
    'Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Duis at consectetur lorem donec massa. Integer quis auctor elit sed vulputate mi sit amet. Aenean euismod elementum nisi quis eleifend quam. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Nisl condimentum id venenatis a. Dignissim enim sit amet venenatis urna. Duis tristique sollicitudin nibh sit amet. Ornare lectus sit amet est placerat in egestas. Quisque id diam vel quam elementum pulvinar etiam non. Lacus sed turpis tincidunt id aliquet risus. Arcu non odio euismod lacinia at quis risus sed vulputate. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Tellus mauris a diam maecenas sed enim ut sem.';
  const demarche =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Interdum velit laoreet id donec ultrices tincidunt arcu non sodales. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. In fermentum et sollicitudin ac orci phasellus egestas tellus. Tellus in metus vulputate eu scelerisque felis imperdiet. Magna sit amet purus gravida. Urna neque viverra justo nec. Tellus rutrum tellus pellentesque eu tincidunt tortor. Non tellus orci ac auctor augue mauris augue. Odio tempor orci dapibus ultrices in.';

  return (
    <>
      <Layout introduction={introduction}>
        <div className={s.main}>
          <div className={s.center}>
            <Image
              className={s.logo}
              src="/next.svg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
          <div className={s.grid}>
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={s.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                Docs <span>-&gt;</span>
              </h2>
              <p>
                Find in-depth information about Next.js features and&nbsp;API.
              </p>
            </a>

            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={s.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                Learn <span>-&gt;</span>
              </h2>
              <p>
                Learn about Next.js in an interactive course with&nbsp;quizzes!
              </p>
            </a>

            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={s.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                Templates <span>-&gt;</span>
              </h2>
              <p>
                Discover and deploy boilerplate example Next.js&nbsp;projects.
              </p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={s.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                Deploy <span>-&gt;</span>
              </h2>
              <p>
                Instantly deploy your Next.js site to a shareable URL
                with&nbsp;Vercel.
              </p>
            </a>
          </div>
        </div>
        <HomePart
          title="Présentation"
          content={presentation}
          imageSrc="assets/4.jpeg"
        />
        <HomePart
          title="Démarche artistique"
          content={demarche}
          imageSrc="assets/1.jpeg"
        />
        <HomeContactPart title="Contact" imageSrc="assets/2.jpeg" />
      </Layout>
    </>
  );
}
