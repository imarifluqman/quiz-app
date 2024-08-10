import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
function Footer(params) {
  return (
    <div className="w-[100%] bg-slate-100 ">
      <div className="w-[100%] p-4 lg:flex sm:flex sm:justify-around sm:items-center lg:justify-around lg:items-center">
        <div className="">
          <p className="my-2 underline text-xl text-bold leading-3 ">
            About Me
          </p>
          <p>Name: Muhammad Arif</p>
          <p>Contact: +923232523477</p>
          <p>Address: Karachi, Pakistan</p>
          <p>Email: imarifluqman@gmail.com</p>
        </div>
        <ul className="">
          <li className="p-2  mt-2 underline text-xl text-bold leading-3  ">
            Social Links
          </li>

          <li className="p-1 mr-1 hover:scale-110 transition">
            <FaLinkedin className="text-3xl inline" />
            LinkedIn
          </li>

          <li className="p-1 mt-1 hover:scale-110 transition">
            <FaFacebookSquare className="text-3xl inline" />
            Facebook
          </li>
          <li className="p-1 mt-1 hover:scale-110 transition">
            <FaSquareXTwitter className="text-3xl inline" />
            Twitter
          </li>
          <li className="p-1 mt-1 hover:scale-110 transition">
            <FaInstagramSquare className="text-3xl inline" />
            Instagram
          </li>
        </ul>
      </div>

      <p className="text-center py-4 bg-slate-200">
        Developed by{" "}
        <span className="text-green-700 text-bold cursor-pointer">Arif Luqman ❤ </span> ©{" "}
        {new Date().getFullYear()} - All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
