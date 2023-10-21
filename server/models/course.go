package models

type Course struct {
	Course_code string `db:"course_code" json:"course_code"`
	Course_name string `db:"course_name" json:"course_name"`
	Credits     int    `db:"credits" json:"credits"`
	Department  string `db:"department" json:"department"`
}
