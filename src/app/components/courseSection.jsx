"use client";
import Image from "next/image";
import { courseData } from "../components/courseData";
import { useRouter } from "next/navigation";
function CourseSection() {
  let router = useRouter();

  const navigateWithData = (data) => {
    router.push(`/${data.name}?playlistId=${data.PLAYLIST_ID}`);
  };

  return (
    <div className="w-[100%] lg:h-[100vh] pt-2 bg-slate-100">
      <div className=" shadow p-4">
        <p className="text-1xl m-4 text-bold">💕 Choose your course 💻</p>
      </div>
      <div className="flex flex-wrap justify-center">
        {courseData.map((course) => {
          return (
            <div
              onClick={() => navigateWithData(course)}
              key={course.name}
              className="w-[120px] lg:w-[150px] sm:w-[150px] border-2 m-4 p-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 transition "
            >
              <Image
                src={course.icon}
                width={80}
                height={80}
                alt={course.name}
              />
              <p className="text-xl border-t-2 mt-2 w-[100%] text-center">
                {course.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CourseSection;
