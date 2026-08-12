import { getLessons } from "@/db/queries";
import {List} from "./list"

const LessonsPage = async () => {
    const lessons = await getLessons();
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
             Lessons
            </h1>
              <List 
              lessons={lessons}
              activeCourseId={1}
              />
        </div>
    )
}

export default LessonsPage;