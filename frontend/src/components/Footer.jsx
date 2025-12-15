import React from "react";
import {
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Shield,
  HandHelping,
} from "lucide-react";

import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-white">
      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-200/40 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl" />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="SkillForge" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-indigo-600">
                SkillForge
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Transform your learning journey with interactive courses and
              cutting-edge educational technology designed for modern learners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-cyan-600 mb-4">
              <ArrowRight size={20} />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Courses", icon: BookOpen },
                { name: "About Us", icon: Users },
                { name: "Faculty", icon: FileText },
                { name: "Contact", icon: Mail },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i}>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-600 hover:text-cyan-600 transition"
                    >
                      <Icon size={18} />
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-purple-600 mb-4">
              <HandHelping size={20} />
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Help Center", icon: HelpCircle },
                { name: "Privacy Policy", icon: Shield },
                { name: "Terms of Service", icon: FileText },
                { name: "FAQs", icon: HelpCircle },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i}>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition"
                    >
                      <Icon size={18} />
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              Contact Us
            </h4>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-100 text-cyan-600">
                  <MapPin size={20} />
                </div>
                <p className="text-gray-600">
                  Mahal 440032 <br /> Nagpur
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                  <Phone size={20} />
                </div>
                <p className="text-gray-600">
                  +91 7743815478 <br />
                  <span className="text-sm text-gray-500">
                    Mon–Fri, 9AM–6PM
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-green-100 text-green-600">
                  <Mail size={20} />
                </div>
                <p className="text-gray-600">
                  sachingiri01@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Icons */}
          <div className="flex gap-4">
            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition cursor-pointer shadow-sm"
              >
                <Icon size={20} />
              </div>
            ))}
          </div>

          {/* Credit */}
          <div className="px-6 py-3 bg-white rounded-xl shadow-md text-gray-700 font-medium">
            Design by <span className="font-semibold"> Sachin Giri</span>
          </div>
        </div>
      </div>

      {/* Scroll To Top */}
      <button className="fixed bottom-6 right-6 p-4 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition">
        ↑
      </button>
    </footer>
  );
};

export default Footer;
