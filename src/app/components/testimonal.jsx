import Image from "next/image";
import Next from "../../../public/icons/Nextjs.png";
function Testimonal(params) {
  return (
    <div className="w-[100%] mt-4 p-4">
      <p className="text-1xl border-b-2 lg:pb-4 mb-8">💕 Testimonals 👨‍⚖️</p>

      <div className="lg:w-[400px] w-[90%] mx-auto mt-6">
        <div className="border rounded m-2 p-4 flex justify-center items-center  bg-slate-100">
          <div className="w-[30%] mr-4">
            <Image
              src={Next}
              alt="News and Blogs"
              width={100}
              height={100}
              className="rounded-full "
            />
            <p className="text-[14px] mt-2 text-center">Arif Luqman</p>
          </div>
          <div className="w-[70%] ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis est fuga ullam qui dicta quas accusantium odit,
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonal;
