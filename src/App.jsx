
import { useEffect, useRef, useState } from "react";
import { FaHeart, FaLocationDot, FaCalendarDays } from "react-icons/fa6";
import "./App.css";

const weddingDate = new Date("2026-12-19T10:00:00");

const mapLink =
  "https://www.google.com/maps/dir//TKH+Auditorium,+VWQM%2BVJ9,+Kattachira+Rd,+Tirur,+Talakkad,+Keralam+676102/@10.8241309,75.936384,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ba7b1b0048238db:0xf1dad0b1ab4c0b23!2m2!1d75.9340934!2d10.8897107?entry=ttu";

function FloralLine() {
  return (
    <div className="floral-line" aria-hidden="true">
      <span />
      <span />
    </div>
  );
}

function Countdown() {
  const [values, setValues] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const update = () => {
      const remaining = Math.max(0, weddingDate.getTime() - Date.now());

      setValues([
        Math.floor(remaining / 86400000),
        Math.floor((remaining / 3600000) % 24),
        Math.floor((remaining / 60000) % 60),
        Math.floor((remaining / 1000) % 60),
      ]);
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
        <div className="countdown-cell" key={label}>
          <strong>{String(values[index]).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function ScratchCard() {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPoint = useRef(null);
  const moveCount = useRef(0);

  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) return;

    const ratio = Math.max(1, window.devicePixelRatio || 1);

    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);

    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.globalCompositeOperation = "source-over";
    context.clearRect(0, 0, width, height);

    const gradient = context.createLinearGradient(0, 0, width, height);

    gradient.addColorStop(0, "#cbd9bd");
    gradient.addColorStop(0.5, "#e5edda");
    gradient.addColorStop(1, "#b9cba7");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "#c6a875";
    context.lineWidth = 2;
    context.strokeRect(12, 12, width - 24, height - 24);

    context.fillStyle = "#788d68";
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.font = "30px Georgia";
    context.fillText("❦", width / 2, height / 2 - 35);

    context.font = "italic 24px Georgia";
    context.fillText("Scratch to Reveal", width / 2, height / 2 + 5);

    context.font = "13px Georgia";
    context.fillText(
      "Discover our special day",
      width / 2,
      height / 2 + 38
    );

    return () => {
      drawing.current = false;
      lastPoint.current = null;
    };
  }, []);

  const getPosition = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const eraseAt = (context, x, y) => {
    context.beginPath();
    context.arc(x, y, 27, 0, Math.PI * 2);
    context.fill();
  };

  const checkRevealProgress = (canvas, context) => {
    const pixels = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let checked = 0;
    let transparent = 0;

    for (let index = 3; index < pixels.length; index += 32) {
      checked++;

      if (pixels[index] < 80) {
        transparent++;
      }
    }

    if (checked > 0 && transparent / checked >= 0.30) {
      setRevealed(true);
      drawing.current = false;
      lastPoint.current = null;
    }
  };

  const startScratch = (event) => {
    if (revealed || !canvasRef.current) return;

    event.preventDefault();

    drawing.current = true;
    moveCount.current = 0;
    lastPoint.current = getPosition(event);

    setStarted(true);

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    const context = canvasRef.current.getContext("2d");

    context.globalCompositeOperation = "destination-out";

    eraseAt(
      context,
      lastPoint.current.x,
      lastPoint.current.y
    );
  };

  const scratch = (event) => {
    if (!drawing.current || revealed || !canvasRef.current) return;

    event.preventDefault();

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const point = getPosition(event);
    const previous = lastPoint.current;

    if (!previous) {
      lastPoint.current = point;
      return;
    }

    context.globalCompositeOperation = "destination-out";

    context.beginPath();
    context.moveTo(previous.x, previous.y);
    context.lineTo(point.x, point.y);
    context.lineWidth = 54;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();

    eraseAt(context, point.x, point.y);

    lastPoint.current = point;
    moveCount.current++;

    if (moveCount.current % 6 === 0) {
      checkRevealProgress(canvas, context);
    }
  };

  const stopScratch = () => {
    drawing.current = false;
    lastPoint.current = null;
  };

  return (
    <div className="scratch-card">
      <div className="scratch-under">
        <p className="tiny-heading">Save the date</p>

        <div className="scratch-day">19</div>

        <p className="scratch-month">
          SATURDAY · DECEMBER · 2026
        </p>

        <FloralLine />

        <h3>Sidra &amp; Ajmal</h3>

        <p>Our wedding celebration</p>
      </div>

      {!revealed && (
        <canvas
          ref={canvasRef}
          className="scratch-layer"
          aria-label="Scratch this card to reveal the wedding date"
          onPointerDown={startScratch}
          onPointerMove={scratch}
          onPointerUp={stopScratch}
          onPointerCancel={stopScratch}
          onLostPointerCapture={stopScratch}
        />
      )}

      {!revealed && (
        <p className="scratch-tip">
          {started
            ? "Keep scratching..."
            : "Scratch with your finger or mouse"}
        </p>
      )}
    </div>
  );
}

function CurtainOpening({ onComplete }) {
  const [opening, setOpening] = useState(false);

  const openCurtains = () => {
    if (opening) return;

    setOpening(true);
    window.setTimeout(onComplete, 2400);
  };

  return (
    <div className={`curtain-screen ${opening ? "curtains-open" : ""}`}>
      <div className="curtain-panel curtain-panel-left" />
      <div className="curtain-panel curtain-panel-right" />

      <div className="curtain-ornament"></div>

      <div className="chandelier" aria-hidden="true">
        <span className="chandelier-chain" />
        <span className="chandelier-crown"></span>
        <span className="chandelier-body"></span>
        <span className="chandelier-drops"></span>
      </div>

      <div className="curtain-invitation">
        <p className="mini-label">Together with our families</p>

        <p className="curtain-monogram">
          S <i>&amp;</i> A
        </p>

        {/* <h1>
          Sidra <span>&amp;</span> Ajmal
        </h1> */}
        <h1>
  Sidra <span>&amp;</span>{" "}
  <span className="groom-name">Ajmal</span>
</h1>
        <FloralLine />

        <p className="curtain-date">19 · 12 · 2026</p>

        <button onClick={openCurtains} disabled={opening}>
          {opening ? "Welcome..." : "Tap to Open"} ♡
        </button>
      </div>

      <div className="curtain-bottom-flowers"></div>
    </div>
  );
}

function App() {
  const [showCurtain, setShowCurtain] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);

  return (
    <main className="wedding-page">

      {/* FIRST INVITATION SCREEN */}

      {!showWebsite && !showCurtain && (
        <section className="intro-screen">
          <div className="intro-card">

            <p className="mini-label">
              You are cordially invited
            </p>

            <div
              className="intro-emblem"
              aria-label="Sidra and Ajmal monogram"
            >
              <span className="initial-s">S</span>
              <span className="initial-amp">&amp;</span>
              <span className="initial-a">A</span>
            </div>

            <p className="intro-script">
              The Blessed Beginning
            </p>

            <p className="intro-copy">
              With the blessings of our families,
              we invite you to join us as we begin
              our beautiful journey together.
            </p>

            <h1>
              Sidra <span>&amp;</span> Ajmal
            </h1>

            <FloralLine />

            <p className="intro-date">
              19 December 2026
            </p>

            <button
              className="intro-button"
              onClick={() => setShowCurtain(true)}
            >
              Open Invitation ♡
            </button>

            <div className="rose-border">
             
            </div>

          </div>
        </section>
      )}

      {/* CURTAIN OPENING */}

      {showCurtain && !showWebsite && (
        <CurtainOpening
          onComplete={() => setShowWebsite(true)}
        />
      )}

      {/* MAIN WEDDING WEBSITE */}

      {showWebsite && (
        <div className="website-content website-visible">

          <header className="hero-section">
            <div className="corner-flower corner-one">❀</div>
            <div className="corner-flower corner-two">❀</div>

            <p className="arabic" lang="ar" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="mini-label">
              A beautiful beginning
            </p>

            <h1>
              Sidra <span>&amp;</span> Ajmal
            </h1>

            <FloralLine />

            <p className="hero-copy">
              Two hearts, two families, one beautiful journey.
              <br />
              We request the pleasure of your company.
            </p>

            <p className="hero-date">
              <FaCalendarDays />
              Saturday, 19 December 2026
            </p>

            <a className="scroll-cue" href="#invitation">
              Scroll to explore ↓
            </a>
          </header>

          {/* SCRATCH CARD */}

          <section className="invitation-section" id="invitation">
            <p className="mini-label">
              A little surprise for you
            </p>

            <h2 className="section-heading">
              Scratch to Reveal
            </h2>

            <p className="section-copy">
              Gently scratch the card to discover our special day.
            </p>

            <ScratchCard />
          </section>

          {/* BLESSING */}

          <section className="blessing-section">
            <p className="mini-label">
              A journey blessed with love
            </p>

            <h2 className="section-heading">
              With the Blessings of Allah
            </h2>

            <FloralLine />

            <p className="quran-text" lang="ar" dir="rtl">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ
              أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
              وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </p>

            <p className="quran-translation">
              “And He placed between you affection and mercy.”
            </p>

            <p className="quran-reference">
              SURAH AR-RUM · 30:21
            </p>
          </section>

          {/* COUNTDOWN */}

          <section className="countdown-section">
            <p className="mini-label">
              The celebration is getting closer
            </p>

            <h2 className="section-heading">
              Counting Every Heartbeat
            </h2>

            <FloralLine />

            <Countdown />

            <p className="countdown-note">
              Until our forever begins
            </p>
          </section>

          {/* BRIDE AND GROOM */}

          <section className="couple-intro-section">
            <p className="mini-label">
              Two families, one celebration
            </p>

            <h2 className="section-heading">
              The Bride &amp; Groom
            </h2>

            <FloralLine />

            <div className="people-grid">

              <article className="person-card">
                <div className="person-photo">
                  <img
                    src="/bride-back.jpg"
                    alt="Bride from behind"
                  />
                </div>

                <p className="mini-label">The Bride</p>

                <h3>Sidra</h3>

                <p>Daughter of</p>

                <p className="parent-names">
                  Mr. Samad
                  <br />
                  &amp; Mrs. Saifunnisa
                </p>

                <FloralLine />

                <p>With her siblings</p>

                <p className="parent-names">
                  Nibras &amp; Isra
                </p>
              </article>

              <article className="person-card">
                <div className="person-photo">
                  <img
                    src="/groom-back.jpg"
                    alt="Groom from behind"
                  />
                </div>

                <p className="mini-label">The Groom</p>

                <h3>Ajmal</h3>

                <p>Son of</p>

                <p className="parent-names">
                  Mr. Zainulabideen
                  <br />
                  &amp; Mrs. Safiya
                </p>

                <FloralLine />

                <p>With his brothers</p>

                <p className="parent-names">
                  Ewan &amp; Hadhi
                </p>
              </article>

            </div>
          </section>

          {/* COUPLE PHOTO */}

          <section className="couple-photo-section">
            <p className="mini-label">
              A moment to cherish
            </p>

            <h2 className="section-heading">
              Together, Always
            </h2>

            <div className="large-couple-photo">
              <img
                src="/couple-back.jpg"
                alt="Bride and groom together, seen from behind"
              />
            </div>

            <p className="photo-caption">
              A lifetime of love begins here.
            </p>
          </section>

          {/* WEDDING DAY */}

          <section className="event-section">
            <p className="mini-label">
              The celebration
            </p>

            <h2 className="section-heading">
              Our Wedding Day
            </h2>

            <FloralLine />

            <div className="event-card">
              <p className="event-kicker">
                THE WEDDING CELEBRATION
              </p>

              <h3>Sidra &amp; Ajmal</h3>

              <p>Saturday · 19 December 2026</p>

              <p>11:00 AM</p>

              <div className="event-flower">✿</div>
            </div>
          </section>

          {/* VENUE */}

          <section className="venue-section">
            <p className="mini-label">
              We look forward to seeing you
            </p>

            <h2 className="section-heading">
              The Venue
            </h2>

            <FloralLine />

            <div className="venue-card">
              <FaLocationDot className="venue-icon" />

              <p className="event-kicker">
                WEDDING VENUE
              </p>

              <h3>TKH Auditorium</h3>

              <p>
                Kattachira Road, Tirur, Talakkad,
                <br />
                Kerala 676102
              </p>

              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLocationDot />
                View on Google Maps
              </a>

              <p className="venue-date">
                Saturday · 19 December 2026
              </p>
            </div>
          </section>

          {/* DUA */}

          <section className="dua-section">
            <p className="mini-label">
              A beautiful dua for the couple
            </p>

            <h2 className="section-heading">
              May Allah Bless Our Journey
            </h2>

            <FloralLine />

            <p className="dua-arabic" lang="ar" dir="rtl">
              بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
              وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>

            <p>
              May Allah bless you both, shower His blessings upon you,
              and unite you in goodness.
            </p>
          </section>

          {/* FOOTER */}

          <footer className="footer-section">
            <div className="footer-flowers">
              ✿ ❦ ✿
            </div>

            <p className="mini-label">
              We can't wait to celebrate with you
            </p>

            <h2>
              Sidra <span>&amp;</span> Ajmal
            </h2>

            <p className="footer-date">
              19 · 12 · 2026
            </p>

            <FloralLine />

            <p>With love, duas and gratitude</p>

            <FaHeart className="footer-heart" />
          </footer>

        </div>
      )}

    </main>
  );
}

export default App;
