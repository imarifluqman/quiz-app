import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
function Footer(params) {
  return (
    <div className="w-[100%] bg-slate-100 ">
      <div className="w-[100%] p-4 lg:flex sm:flex sm:justify-around sm:items-center lg:justify-around lg:items-center">
        <div className="">
          <p className="my-2 underline text-xl text-bold leading-3 ">
            About Me
          </p>
          <p>
            Name:{" "}
            <a href="https://www.linkedin.com/in/imarifluqman" target="_blank">
              {" "}
              Muhammad Arif
            </a>
          </p>
          <p>
            Contact:{" "}
            <a href="tel:+923232523477" target="_blank">
              {" "}
              +923232523477
            </a>
          </p>
          <p>Address: Karachi, Pakistan</p>
          <p>
            Email:{" "}
            <a href="mailto:imarifluqman@gmail"> imarifluqman@gmail.com</a>
          </p>
        </div>
        <ul className="">
          <li className="p-2  mt-2 underline text-xl text-bold leading-3  ">
            Social Links
          </li>

          <li className="p-1 mr-1 hover:scale-110 transition">
            <a href="https://www.linkedin.com/in/imarifluqman" target="_blank">
              <FaLinkedin className="text-3xl inline" />
              LinkedIn
            </a>
          </li>

          <li className="p-1 mt-1 hover:scale-110 transition">
            <a href="https://www.facebook.com/imarifluqman" target="_blank">
              <FaFacebookSquare className="text-3xl inline" />
              Facebook
            </a>
          </li>
          <li className="p-1 mt-1 hover:scale-110 transition">
            <a href="https://twitter.com/imarifluqman" target="_blank">
              <FaSquareXTwitter className="text-3xl inline" />
              Twitter
            </a>
          </li>
          <li className="p-1 mt-1 hover:scale-110 transition">
            <a href="https://github.com/imarifluqman" target="_blank">
              <FaGithubSquare className="text-3xl inline" />
              gitHub{" "}
            </a>
          </li>
        </ul>
      </div>

      <p className="text-center py-4 bg-slate-200">
        Developed by{" "}
        <span className="text-green-700 text-bold cursor-pointer">
          <a href="https://github.com/imarifluqman" target="_blank">
            {" "}
            Arif Luqman ❤{" "}
          </a>
        </span>{" "}
        © {new Date().getFullYear()} - All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
