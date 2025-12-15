import React from "react";
import { Star } from "lucide-react";

import {
  aboutUsAnimations,
  aboutUsStyles,
} from "../assets/dummyStyles";

import AboutBanner from "../assets/AboutBannerImage.png";

const Aboutpage = () => {
  return (
    <section className={aboutUsStyles.heroSection}>
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

      {/* Content */}
      <div className={aboutUsStyles.heroContent}>
        <div className={aboutUsStyles.trustBadge}>
          <Star className={aboutUsStyles.trustIcon} />
          <span>Trusted by 500+ students worldwide</span>
        </div>
      </div>

      {/* Animations */}
      <style>{aboutUsAnimations}</style>
    </section>
  );
};

export default Aboutpage;
