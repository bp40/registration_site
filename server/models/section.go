package models

type Section struct {
	Id            string `json:"section_id" db:"section_id"`
	Timeslot      int    `json:"timeslot_id" db:"timeslot_id"`
	InstructorId  int    `json:"instructor_id" db:"instructor_id"`
	CourseCode    string `json:"course_code" db:"course_code"`
	SectionNumber int    `json:"section_number" db:"section_number"`
	Capacity      int    `json:"max_students" db:"max_students"`
	Semester      int    `json:"semester" db:"semester"`
	Year          int    `json:"year" db:"year"`
	RoomNumber    int    `json:"room_number" db:"room_number"`
}

type WebSection struct {
	Id              string `json:"section_id" db:"section_id"`
	CourseCode      string `json:"course_code" db:"course_code"`
	CourseName      string `json:"course_name" db:"course_name"`
	Credits         int    `json:"credits" db:"credits"`
	Timeslot        int    `json:"timeslot_id" db:"timeslot_id"`
	InstructorFname string `json:"instructor_fname" db:"first_name"`
	InstructorLname string `json:"instructor_lname" db:"last_name"`
	SectionNumber   int    `json:"section_number" db:"section_number"`
	CurrentEnrolled int    `json:"current_enrolled" db:"current_enrolled"`
	Capacity        int    `json:"max_students" db:"max_students"`
	Semester        int    `json:"semester" db:"semester"`
	Year            int    `json:"year" db:"year"`
	RoomNumber      int    `json:"room_number" db:"room_number"`
}

type SimpleSection struct {
	Id       string `db:"section_id"`
	Timeslot int    `db:"timeslot_id"`
}
