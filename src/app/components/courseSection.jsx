import Image from "next/image";
import { courseIcons } from "../components/courseIcons";
function CourseSection(params) {
  return (
    <div className="w-[100%] lg:h-[100vh] pt-2 bg-slate-100">
      <div className="text-2xl shadow p-4">
        <p className="m-4 text-bold">💕 Choose your course 💻</p>
      </div>
      <div className="flex flex-wrap justify-center">
        {courseIcons.map((course) => {
          return (
            <div className="w-[150px] border-2 m-4 p-4 rounded-lg flex flex-col justify-center items-center hover:scale-110 transition ">
              <Image src={course.icon} width={80} height={80} />
              <p className="text-xl border-t-2 mt-2 w-[100%] text-center pt-2">
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
