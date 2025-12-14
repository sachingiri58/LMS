import React from "react";
import { footerStyles, footerBackgroundStyles, iconColors } from "../assets/dummyStyles";
import { quickLinks, supportLinks } from "../assets/dummyFooter";
import logo from "../assets/logo.png";

import {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Shield,
  HandHelping,
} from "lucide-react";

const iconMap = {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Shield,
  HandHelping,
};

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerBackgroundStyles.backgroundContainer}>
        <div className={footerBackgroundStyles.floatingOrb1}>
          <div className={footerBackgroundStyles.floatingOrb2}>
            <div className={footerBackgroundStyles.floatingOrb3}>
              <div className={footerBackgroundStyles.floatingOrb4}>
                <div className={footerBackgroundStyles.gridOverlay}>
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
                      backgroundSize: "50px 50px",
                    }}
                  />
                </div>
              </div>

              <div className={footerStyles.container}>
                <div className={footerStyles.grid}>
                  <div className={footerStyles.brandSection}>
                    <div className={footerStyles.brandTransform}>
                      <div className={footerStyles.brandContainer}>
                        <div className={footerStyles.brandGradient}></div>
                        <div className="relative font-serif flex items-center gap-3">
                          <img src={logo} alt="logo" className="w-12 h-12" />
                          <h3 className={footerStyles.brandTitle}>
                            SkillForge
                          </h3>
                        </div>
                      </div>

                      <p className={footerStyles.brandDescription}>
                        Transform your learning journey with interactive
                        courses and cutting edge educational technology
                        designed for modern learners.
                      </p>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h4 className={`${footerStyles.sectionHeader} ${iconColors.cyan}`}>
                      <ArrowRight className={footerStyles.sectionIcon} />
                      Quick Links
                    </h4>
                    <ul className={footerStyles.linksList}>
                      {quickLinks.map((link, index) => {
                        const Icon = iconMap[link.iconKey] || ArrowRight;
                        return (
                          <li key={link.name}>
                            <a
                              href={link.href}
                              className={`${footerStyles.linkItem} ${iconColors.cyan}`}
                              style={{ transitionDelay: `${index * 80}ms` }}
                            >
                              <Icon className={`${footerStyles.linkIcon} ${iconColors.cyan}`} />
                              <span className="truncate">{link.name}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Support */}
                  <div>
                    <h4 className={`${footerStyles.sectionHeader} ${iconColors.purple}`}>
                      <HandHelping className={footerStyles.sectionIcon} />
                      Support
                    </h4>
                    <ul className={footerStyles.linksList}>
                      {supportLinks.map((link, index) => {
                        const Icon = iconMap[link.iconKey] || HelpCircle;
                        return (
                          <li key={link.name}>
                            <a
                              href={link.href}
                              className={`${footerStyles.linkItem} ${iconColors.purple}`}
                              style={{ transitionDelay: `${index * 80}ms` }}
                            >
                              <Icon className={`${footerStyles.linkIcon} ${iconColors.purple}`} />
                              <span className="truncate">{link.name}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
