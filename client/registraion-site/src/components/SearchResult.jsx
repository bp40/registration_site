import { sectionsAtom } from "../routes/search.jsx";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

const SearchResult = () => {
  const results = useAtomValue(sectionsAtom);
  const [courseCart, setCourseCart] = useState([]);
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

  const calculateDayColor = (day) => {
    switch (day) {
      case "MONDAY AM":
      case "MONDAY PM":
        return "badge badge-warning gap-2";
      case "TUESDAY AM":
      case "TUESDAY PM":
        return "badge badge-secondary gap-2";
      case "WEDNESDAY AM":
      case "WEDNESDAY PM":
        return "badge badge-accent gap-2";
      case "THURSDAY AM":
      case "THURSDAY PM":
        return "badge badge-warning badge-outline gap-2";
      case "FRIDAY AM":
      case "FRIDAY PM":
        return "badge badge-info gap-2";
      default:
        return "";
    }
  };

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
                    ) : item.current_students === item.max_students ? (
                      <div className="badge badge-warning gap-2">
                        Almost Full
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
