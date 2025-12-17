import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

import {
  aboutUsAnimations,
  aboutUsStyles,
} from "../assets/dummyStyles";

import AboutBanner from "../assets/AboutBannerImage.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const statsMeta = [
  { key: "students", number: "500+", label: "Students" },
  { key: "courses", number: "50+", label: "Courses" },
  { key: "successRate", number: "95%", label: "Success Rate" },
  { key: "countries", number: "10+", label: "Countries" },
];

const counterTargets = {
  students: 500,
  courses: 50,
  successRate: 95,
  countries: 10,
  certificates: 1200,
  support: 24,
};

const Aboutpage = () => {
  const [counterValues, setCounterValues] = useState({
    students: 0,
    courses: 0,
    successRate: 0,
    countries: 0,
    certificates: 0,
    support: 0,
  });

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const timers = [];

    Object.keys(counterTargets).forEach((key) => {
      let current = 0;
      const target = counterTargets[key];
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounterValues((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }));
      }, stepDuration);

      timers.push(timer);
    });

    return () => timers.forEach((t) => clearInterval(t));
  }, []);

  const formatStatNumber = (key) => {
    if (key === "support") return "24/7";
    if (key === "successRate") return `${counterValues.successRate}%`;
    const val = counterValues[key] ?? 0;
    return `${val.toLocaleString()}+`;
  };

  return (
    <section className={aboutUsStyles.heroSection} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div className={aboutUsStyles.heroBackground}>
        <div
          className={aboutUsStyles.heroImageContainer}
          style={{
            background: `url(${AboutBanner}) center/cover no-repeat`,
            opacity: 0.85,
          }}
        />

        <div
          className={aboutUsStyles.heroVignette}
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.0) 70%, rgba(0,0,0,0.72) 100%)",
          }}
        />

        <div className={aboutUsStyles.heroTint} />
      </div>

      {/* Floating Lottie Animation - Left Bottom */}
      <div style={{
        position: 'absolute',
        left: '5%',
        bottom: '10%',
        width: '250px',
        height: '250px',
        zIndex: 10,
        opacity: 0.9
      }}>
        <DotLottieReact 
          src="https://lottie.host/5c1d5c8f-ef3c-4b5e-ae5c-ec5b0d3f3e6f/FYYLcxKqmZ.json"
          loop
          autoplay
        />
      </div>

      {/* Floating Lottie Animation - Right Bottom */}
      <div style={{
        position: 'absolute',
        right: '5%',
        bottom: '8%',
        width: '280px',
        height: '280px',
        zIndex: 10,
        opacity: 0.9
      }}>
        <DotLottieReact 
          src="https://assets2.lottiefiles.com/packages/lf20_DMgKk1.json"
          loop
          autoplay
        />
      </div>

      {/* Content */}
      <div className={aboutUsStyles.heroContent} style={{ position: 'relative', zIndex: 20 }}>
        <div className={aboutUsStyles.trustBadge}>
          <Star className={aboutUsStyles.trustIcon} />
          <span>Trusted by 500+ students worldwide</span>
        </div>

        <h1 className={aboutUsStyles.mainHeading}>About LeanHub</h1>

        <p className={aboutUsStyles.subHeading}>
          Empowering millions to achieve dreams through
          <span className={aboutUsStyles.inlineHighlight}>
            {" "}accessible education{" "}
          </span>
        </p>

        <div className={aboutUsStyles.statsGrid}>
          {statsMeta.slice(0, 4).map((stat, index) => (
            <div
              key={index}
              className={aboutUsStyles.statCard}
              style={{ minWidth: 120 }}
            >
              <div className={aboutUsStyles.statNumber}>
                {formatStatNumber(stat.key)}
              </div>
              <div className={aboutUsStyles.statLabel}>{stat.label}</div>
            </div>
            
          ))}
        </div>
      </div>


      <style>{aboutUsAnimations}</style>
    </section>
  );
};

export default Aboutpage;