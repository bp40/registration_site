const RegistrationTable = () => {
  return (
    <div className="overflow-x-auto p-4 bordered">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Availability</th>
            <th>Timeslot</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>
              <div className="badge badge-accent"> Available </div>
            </td>
            <td>
              <div className="badge badge-warning"> Monday AM </div>
            </td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>
              <div className="badge badge-accent"> Available </div>
            </td>
            <td>
              <div className="badge badge-warning"> Monday AM </div>
            </td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>
              <div className="badge badge-accent"> Available </div>
            </td>
            <td>
              <div className="badge badge-warning"> Monday AM </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationTable;
