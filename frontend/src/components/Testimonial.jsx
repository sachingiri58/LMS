import React, { useRef, useEffect } from "react";
import { testimonialStyles } from "../assets/dummyStyles";
import testimonials from "../assets/dummyTestimonial";
import {
  MessageSquareQuote,
  Star,
  BadgeCheck,
  CalendarDays
} from "lucide-react";

const Testimonial = () => {
  const cardsRef = useRef([]);

  const isPointerDevice = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer:fine)").matches;

  const onMouseMove = (e, el) => {
    if (!el || !isPointerDevice()) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const px = (x - 0.5) * 2;
    const py = (y - 0.5) * 2;

    el.style.transform = `
      perspective(1200px)
      rotateX(${-py * 10}deg)
      rotateY(${px * 10}deg)
      translate3d(${px * 8}px, ${py * 8}px, 0)
    `;
  };

  const onMouseLeave = (el) => {
    if (!el || !isPointerDevice()) return;

    el.style.transition = "transform 600ms cubic-bezier(.23,1,.32,1)";
    el.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)";

    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 650);
  };

  // ⭐ Render stars
  const renderStars = (rating = 5) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < rating
            ? testimonialStyles.starActive
            : testimonialStyles.starInactive
        }
        fill={i < rating ? "currentColor" : "none"}
      />
    ));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("card-visible");
            }, index * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    cardsRef.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={testimonialStyles.section}>
      <div className={testimonialStyles.container}>
        <h2 className={testimonialStyles.title}>
          <span className={testimonialStyles.titleGradient}>
            Voices of Success
          </span>
        </h2>
        <p className={testimonialStyles.subtitle}>
          Discover how learners transformed their careers.
        </p>
      </div>

      <div className={testimonialStyles.grid}>
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            className={testimonialStyles.cardWrapper}
            onMouseMove={(e) => onMouseMove(e, cardsRef.current[i])}
            onMouseLeave={() => onMouseLeave(cardsRef.current[i])}
          >
            <article
              ref={(el) => (cardsRef.current[i] = el)}
              className={testimonialStyles.card}
            >
              {/* Course */}
              <div className={testimonialStyles.courseBadge}>
                <span className={testimonialStyles.courseBadgeText}>
                  {t.course}
                </span>
              </div>

              {/* Quote icon */}
              <div className={testimonialStyles.quoteIcon}>
                <MessageSquareQuote
                  className={testimonialStyles.quoteIconSvg}
                />
              </div>

              {/* Avatar + Info */}
              <div className={testimonialStyles.content}>
                <div className={testimonialStyles.avatarContainer}>
                  <div className={testimonialStyles.avatarWrapper}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className={testimonialStyles.avatarImage}
                      loading="lazy"
                    />
                    <div className={testimonialStyles.avatarGlow}></div>
                  </div>

                  <div className={testimonialStyles.userInfo}>
                    <h3 className={testimonialStyles.userName}>{t.name}</h3>
                    <p className={testimonialStyles.userRole}>{t.role}</p>
                    <div className={testimonialStyles.starsContainer}>
                      {renderStars(t.rating)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review */}
              <p className={testimonialStyles.review}>{t.review}</p>

              {/* Message */}
              <blockquote className={testimonialStyles.message}>
                <span className={testimonialStyles.quoteMark}>"</span>
                {t.message}
                <span className={testimonialStyles.quoteMark}>"</span>
              </blockquote>

              {/* Footer */}
              <div className={testimonialStyles.footer}>
                <div className={testimonialStyles.verified}>
                  <BadgeCheck className={testimonialStyles.verifiedIcon} />
                  <span>Verified Student</span>
                </div>

                <div className={testimonialStyles.date}>
                  <CalendarDays className={testimonialStyles.dateIcon} />
                  <span>2025</span>
                </div>
              </div>
            </article>
          </div>
        ))}

        {/* Animations */}
        <style>{testimonialStyles.animations}</style>
      </div>
    </section>
  );
};

export default Testimonial;
