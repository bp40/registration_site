package models

type WebStudent struct {
	StudentId   int    `json:"StudentId" db:"student_id"`
	FirstName   string `json:"first_name" db:"first_name"`
	LastName    string `json:"last_name" db:"last_name"`
	Sex         string `json:"sex" db:"sex"`
	DateOfBirth string `json:"date_of_birth" db:"date_of_birth"`
	EnrollYear  int    `json:"enroll_year" db:"enroll_year"`
	Level       string `json:"level" db:"level"`
}

type Student struct {
	WebStudent
	Password string `json:"password" db:"password"`
}

type AuthStudent struct {
	StudentId int    `json:"StudentId" db:"student_id"`
	FirstName string `json:"first_name" db:"first_name"`
	Password  string `json:"password" db:"password"`
}
