"use client";
import Image from "next/image";
import { courseData } from "../components/courseData";
import { useRouter } from "next/navigation";

const cardColors = [
  {
    bg: "from-orange-500 to-red-500",
    light: "bg-orange-50",
    text: "text-orange-600",
  },
  {
    bg: "from-blue-500 to-cyan-500",
    light: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    bg: "from-purple-500 to-violet-500",
    light: "bg-purple-50",
    text: "text-purple-600",
  },
  { bg: "from-sky-500 to-blue-500", light: "bg-sky-50", text: "text-sky-600" },
  {
    bg: "from-yellow-500 to-orange-500",
    light: "bg-yellow-50",
    text: "text-yellow-600",
  },
  {
    bg: "from-blue-600 to-indigo-600",
    light: "bg-indigo-50",
    text: "text-indigo-600",
  },
  {
    bg: "from-cyan-500 to-teal-500",
    light: "bg-cyan-50",
    text: "text-cyan-600",
  },
  {
    bg: "from-gray-800 to-gray-600",
    light: "bg-gray-50",
    text: "text-gray-700",
  },
  {
    bg: "from-green-500 to-emerald-500",
    light: "bg-green-50",
    text: "text-green-600",
  },
  {
    bg: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    bg: "from-gray-700 to-gray-900",
    light: "bg-gray-100",
    text: "text-gray-700",
  },
];

function CourseSection() {
  let router = useRouter();

  const navigateWithData = (data) => {
    router.push(`/${data.name}?playlistId=${data.PLAYLIST_ID}`);
  };

  return (
    <section
      id="courses"
      className="w-full py-16 px-4 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Choose Your Course
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Explore our curated courses and start your learning journey today
          </p>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {courseData.map((course, index) => {
            const color = cardColors[index % cardColors.length];
            return (
              <div
                onClick={() => navigateWithData(course)}
                key={course.name}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                ></div>

                <div className="relative z-10 flex flex-col items-center p-6 sm:p-8">
                  <div
                    className={`${color.light} group-hover:bg-white/20 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300`}
                  >
                    <Image
                      src={course.icon}
                      width={56}
                      height={56}
                      alt={course.name}
                      className="object-contain sm:w-16 sm:h-16 w-12 h-12"
                    />
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold ${color.text} group-hover:text-white transition-colors duration-300`}
                  >
                    {course.name}
                  </h3>
                  <span className="mt-2 text-xs font-medium text-gray-400 group-hover:text-white/80 tracking-wider uppercase transition-colors duration-300">
                    Start Learning
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CourseSection;
