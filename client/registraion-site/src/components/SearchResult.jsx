import { sectionsAtom } from "../routes/search.jsx";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { calculateDayColor } from "../utils/utils.js";

const SearchResult = () => {
  const results = useAtomValue(sectionsAtom);
  const [courseCart, setCourseCart] = useState(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("courseCart"));
    return storedCart || [];
  });
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
  let found = false;
  let mappedResults = "";

  if (results !== null) {
    found = true;
    mappedResults = results.map((item) => ({
      ...item,
      timeslot: timeslotsText[item.timeslot_id],
    }));
  }

  const handleAddCourse = (course) => {
    setCourseCart((current) => [...current, course]);
  };

  useEffect(() => {
    sessionStorage.setItem("courseCart", JSON.stringify(courseCart));
  }, [courseCart]);

  return (
    <div className="overflow-x-auto my-4">
      <table className="table">
        <thead>
          <tr>
            <th>Section No.</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Status</th>
            <th>Timeslot</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {found === false
            ? null
            : mappedResults.map((item, index) => (
                <tr key={item.section_id}>
                  <th> {item.section_number}</th>
                  <td> {item.course_code}</td>
                  <td> {item.course_name}</td>
                  <td>
                    {item.current_students < item.max_students ? (
                      <div className="badge badge-success gap-2">Available</div>
                    ) : item.current_students + 5 >= item.max_students ? (
                      <div className="badge badge-warning gap-2">
                        Near Capacity
                      </div>
                    ) : (
                      <div className="badge badge-error gap-2">Full</div>
                    )}
                  </td>
                  <td>
                    <div className={calculateDayColor(item.timeslot)}>
                      {item.timeslot}
                    </div>
                  </td>
                  <td>
                    {courseCart.find(
                      (section) => section.section_id === item.section_id,
                    ) ? (
                      <button className="btn btn-xs" disabled>
                        Added
                      </button>
                    ) : (
                      <button
                        className="btn btn-xs"
                        onClick={() => handleAddCourse(item)}
                      >
                        Add to Shortlist
                      </button>
                    )}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResult;
