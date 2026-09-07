import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Takeover } from './components/Takeover'
import { Collage } from './components/Collage'
import { VideoStage } from './components/VideoStage'
import { Cult } from './components/Cult'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Takeover />
        <Collage />
        <VideoStage />
        <Cult />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
