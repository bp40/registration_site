export const EnrollmentTable = ({ courses }) => {
  const enrolled = courses.filter((course) => {
    return course.status === "ENROLLED";
  });

  const passed = courses.filter((course) => {
    return course.status === "PASSED";
  });

  const earnedCredits = passed.reduce((acc, cur) => {
    return acc + cur.credits;
  }, 0);

  const failed = courses.filter((course) => {
    return course.status === "FAILED";
  });

  const dropped = courses.filter((course) => {
    return course.status === "DROPPED";
  });

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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th> Currently Enrolling</th>
          </tr>
          {enrolled.map((course) => (
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
              <td> {course.status}</td>
            </tr>
          ))}
          <tr>
            <th> Passed sections </th>
          </tr>
          {passed.map((course) => (
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
              <td> {course.status}</td>
            </tr>
          ))}
          <tr>
            <th> Dropped sections </th>
          </tr>
          {dropped.map((course) => (
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
              <td> {course.status}</td>
            </tr>
          ))}
          <tr>
            <th> Failed sections </th>
          </tr>
          {failed.map((course) => (
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
              <td> {course.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3> Earned Credits {earnedCredits}</h3>
        <h3> Required Credits : 180</h3>
      </div>
    </div>
  );
};
