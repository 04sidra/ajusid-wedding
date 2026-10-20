
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaLocationDot,
  FaCalendarDays,
  FaLeaf,
} from "react-icons/fa6";
import "./App.css";

const weddingDate = new Date("2026-12-19T10:00:00");

function Divider() {
  return (
    <div className="floral-divider">
      <span />
      <FaLeaf />
      <FaHeart />
      <FaLeaf />
      <span />
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();

    const countdownTimer = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  return (
    <div className="wedding-website">
      {/* OPENING ANIMATION */}
      {showIntro && (
        <div className="intro-screen">
          <div className="intro-content">
            <img
              src="/sa-logo.png"
              alt="Sidra and Ajmal wedding monogram"
              className="intro-image"
            />

            <p className="intro-caption">Together with love</p>
            <h1 className="intro-names">Sidra & Ajmal</h1>
            <p className="intro-date">19 · 12 · 2026</p>
          </div>
        </div>
      )}

      {/* MAIN HERO */}
      <header className="hero-section">
        <div className="hero-overlay">
          <p className="bismillah">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <p className="eyebrow">Together with our families</p>

          <h1 className="hero-title">
            Sidra <span>&</span> Ajmal
          </h1>

          <Divider />

          <p className="hero-subtitle">
            Two hearts, one beautiful beginning
          </p>

          <div className="hero-date">
            <FaCalendarDays />
            <span>Saturday, 19 December 2026</span>
          </div>

          <a href="#invitation" className="button button-rose">
            Discover Our Invitation
          </a>
        </div>
      </header>

      {/* INVITATION */}
      <section className="invitation-section" id="invitation">
        <div className="section-content">
          <p className="eyebrow">With the blessings of Allah</p>

          <h2 className="section-title">
            A Beautiful Beginning
          </h2>

          <Divider />

          <p className="quran-arabic">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ
            أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>

          <p className="quran-translation">
            “And among His signs is that He created for you
            spouses from among yourselves so that you may find
            comfort in them, and He has placed between you
            affection and mercy.”
          </p>

          <p className="quran-reference">
            Surah Ar-Rum · 30:21
          </p>

          <p className="invitation-message">
            With grateful hearts and the blessings of our
            families, we invite you to join us as we begin
            this beautiful new chapter of our lives.
          </p>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="countdown-section">
        <div className="section-content">
          <p className="eyebrow">The countdown begins</p>

          <h2 className="section-title">
            Until Our Forever
          </h2>

          <Divider />

          <div className="countdown-grid">
            <div className="countdown-item">
              <span className="countdown-number">
                {timeLeft.days}
              </span>
              <span className="countdown-label">Days</span>
            </div>

            <div className="countdown-item">
              <span className="countdown-number">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="countdown-label">Hours</span>
            </div>

            <div className="countdown-item">
              <span className="countdown-number">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="countdown-label">Minutes</span>
            </div>

            <div className="countdown-item">
              <span className="countdown-number">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>

          <p className="countdown-note">
            Counting every moment until our special day
          </p>
        </div>
      </section>

      {/* BRIDE AND GROOM FAMILIES */}
      <section className="family-section" id="families">
        <div className="section-content">
          <p className="eyebrow">Two families, one celebration</p>

          <h2 className="section-title">
            Our Families
          </h2>

          <Divider />

          <div className="family-grid">
            <article className="family-card">
              <div className="family-flower">❀</div>

              <p className="family-label">The Bride</p>

              <h3 className="family-name">Sidra</h3>

              <p className="family-parent-label">
                Daughter of
              </p>

              <p className="family-parent">
                Mr. Samad
                <br />
                & Mrs. Saifunnisa
              </p>

              <Divider />

              <p className="family-siblings-label">
                With her siblings
              </p>

              <p className="family-siblings">
                Nibras & Isra
              </p>
            </article>

            <article className="family-card">
              <div className="family-flower">❀</div>

              <p className="family-label">The Groom</p>

              <h3 className="family-name">Ajmal</h3>

              <p className="family-parent-label">
                Son of
              </p>

              <p className="family-parent">
                Mr. Zainulabideen
                <br />
                & Mrs. Safiya
              </p>

              <Divider />

              <p className="family-siblings-label">
                With his brothers
              </p>

              <p className="family-siblings">
                Ewan & Hadhi
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ONE WEDDING PHOTO ONLY */}
      <section className="photo-section" id="photo">
        <div className="section-content">
          <p className="eyebrow">A moment to cherish</p>

          <h2 className="section-title">
            A Little Glimpse of Us
          </h2>

          <Divider />

          <div className="single-photo">
            <img
              src="/wedding-photo.jpg"
              alt="Sidra and Ajmal"
              className="wedding-photo"
            />
          </div>

          <p className="photo-caption">
            Two souls, one journey, a lifetime of love.
          </p>
        </div>
      </section>

      {/* WEDDING LOCATION */}
      <section className="venue-section" id="venue">
        <div className="venue-content">
          <div className="venue-icon">
            <FaLocationDot />
          </div>

          <p className="eyebrow">
            We look forward to seeing you
          </p>

          <h2 className="section-title">
            Wedding Location
          </h2>

          <Divider />

          <p className="venue-name">
            Our Wedding Venue
          </p>

          <p className="body-copy">
            Join us to celebrate the special day of
            Sidra & Ajmal.
          </p>

          <a
            href="https://share.google/GLdnWUIoiIDoNAutW"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-sage"
          >
            <FaLocationDot />
            Get Directions
          </a>

          <p className="venue-date">
            Saturday · 19 December 2026
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section">
        <FaHeart className="footer-heart" />

        <p className="footer-message">
          With love and duas
        </p>

        <h2 className="footer-names">
          Sidra & Ajmal
        </h2>

        <p className="footer-date">
          19 · 12 · 2026
        </p>

        <p className="footer-thanks">
          We look forward to celebrating with you.
        </p>
      </footer>
    </div>
  );
}

export default App;
