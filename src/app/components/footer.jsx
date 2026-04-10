import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";
import logo from "../../../public/logo.png";

const socialLinks = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/imarifluqman", label: "LinkedIn", color: "hover:bg-blue-600" },
  { icon: FaFacebookSquare, href: "https://www.facebook.com/imarifluqman", label: "Facebook", color: "hover:bg-blue-500" },
  { icon: FaSquareXTwitter, href: "https://twitter.com/imarifluqman", label: "Twitter", color: "hover:bg-gray-800" },
  { icon: FaGithubSquare, href: "https://github.com/imarifluqman", label: "GitHub", color: "hover:bg-gray-700" },
];

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src={logo} alt="Logo" width={40} height={40} className="brightness-200" />
              <span className="text-xl font-bold text-white">Infinity Code</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A learning platform to master web development through curated courses, interactive quizzes, and certificates.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.linkedin.com/in/imarifluqman" target="_blank" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <HiOutlineLocationMarker className="text-lg text-blue-400" />
                  </span>
                  Muhammad Arif — Karachi, Pakistan
                </a>
              </li>
              <li>
                <a href="tel:+923232523477" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <HiOutlinePhone className="text-lg text-green-400" />
                  </span>
                  +92 323 2523477
                </a>
              </li>
              <li>
                <a href="mailto:imarifluqman@gmail.com" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <HiOutlineMail className="text-lg text-purple-400" />
                  </span>
                  imarifluqman@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase">Follow Me</h3>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  title={s.label}
                  className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white ${s.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                >
                  <s.icon className="text-xl" />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-5 leading-relaxed">
              Connect with me on social media for updates, tips, and new course announcements.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-10 mb-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Infinity Code. All rights reserved.
          </p>
          <p>
            Developed with <span className="text-red-400">&hearts;</span> by{" "}
            <a
              href="https://github.com/imarifluqman"
              target="_blank"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Arif Luqman
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
