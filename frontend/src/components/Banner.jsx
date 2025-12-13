import React, { useState } from "react";
import { bannerStyles, customStyles } from "../assets/dummyStyles";
import { features, floatingIcons } from "../assets/dummyBanner";
import { CircleCheckBig, Sparkle, X } from "lucide-react";
import bannerImg from "../assets/Bannerimage.jpg";
import Video from "../assets/BannerVideo.mp4";

const Banner = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className={bannerStyles.container}>
      {/* Floating Icons */}
      <div className={bannerStyles.floatingIconsWrapper}>
        {floatingIcons.map((icon, i) => (
          <img
            key={i}
            src={icon.src}
            alt={icon.alt || ""}
            className={`${bannerStyles.floatingIcon} ${icon.pos}`}
            style={{
              animationDelay: `${i * 0.35}s`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      <div className={bannerStyles.mainContent}>
        <div className={bannerStyles.grid}>
          {/* Left Content */}
          <div className={bannerStyles.leftContent}>
            <span className={bannerStyles.badge}>
              <Sparkle className={bannerStyles.badgeIcon} />
              New Feature Available
            </span>

            <h1 className={bannerStyles.heading}>
              <span className={bannerStyles.headingSpan1}>
                Build Amazing
              </span>
              <span className={bannerStyles.headingSpan2}>
                Digital Product
              </span>
            </h1>

            <p className={bannerStyles.description}>
              Create beautiful, responsive web applications with our
              powerful tools and components. Start building your next
              project today.
            </p>

            {/* Features */}
            <div className={bannerStyles.featuresGrid}>
              {features.map((feature, i) => (
                <div key={i} className={bannerStyles.featureItem}>
                  <div className={bannerStyles.featureIconContainer}>
                    <span className={bannerStyles.featureIcon}>
                      <CircleCheckBig size={16} />
                    </span>
                  </div>
                  <span className={bannerStyles.featureText}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className={bannerStyles.buttonsContainer}>
              <a
                href="/courses"
                className={bannerStyles.buttonGetStarted}
              >
                Get Started
              </a>

              <button
                className={bannerStyles.buttonViewDemo}
                onClick={() => setShowVideo(true)}
              >
                View Demo
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className={bannerStyles.imageContainer}>
            <img
              src={bannerImg}
              alt="Banner"
              className={bannerStyles.image}
            />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className={bannerStyles.videoModal.overlay}>
          <div className={bannerStyles.videoModal.container}>
            <video
              src={Video}
              className={bannerStyles.videoModal.iframe}
              controls
              autoPlay
            />

            <button
              onClick={() => setShowVideo(false)}
              className={bannerStyles.videoModal.closeButton}
            >
              <X className={bannerStyles.videoModal.closeIcon} />
            </button>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>{customStyles}</style>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Banner;
