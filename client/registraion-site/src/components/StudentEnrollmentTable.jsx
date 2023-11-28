import {calculateDayColor} from "../utils/utils.js";

export const StudentEnrollmentTable = ({ courses }) => {

    const timeslotsText = [
        "MONDAY AM",
        "MONDAY PM",
        "TUESDAY AM",
        "TUESDAY PM",
        "WEDNESDAY AM",
        "WEDNESDAY PM",
        "THURSDAY AM",
        "THURSDAY PM",
        "FRIDAY AM",
        "FRIDAY PM",
    ];

    let mappedResults = "";

    if (courses !== null) {
        mappedResults = courses.map((course) => ({
            ...course,
            timeslot: timeslotsText[course.timeslot_id],
        }));
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    <th>Section ID</th>
                    <th>Course code</th>
                    <th>Course name</th>
                    <th>Instructor name</th>
                    <th>Room number</th>
                    <th>Semester</th>
                    <th>Credits</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {mappedResults.map((course) => (
                    <tr key={course.section_id}>
                        <td> {course.section_id}</td>
                        <td> {course.course_code}</td>
                        <td> {course.course_name}</td>
                        <td>
                            {course.instructor_fname} {course.instructor_lname}
                        </td>
                        <td> {course.room_number}</td>
                        <td>
                            {course.semester} / {course.year}
                        </td>
                        <td> {course.credits}</td>
                        <td className={calculateDayColor(course.timeslot)}> {course.timeslot}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
