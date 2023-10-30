package models

import "time"

type Student struct {
	StudentId   int       `json:"StudentId" db:"student_id"`
	FirstName   string    `json:"first_name" db:"first_name"`
	LastName    string    `json:"last_name" db:"last_name"`
	Password    string    `json:"password" db:"password"`
	Sex         string    `json:"sex" db:"sex"`
	DateOfBirth time.Time `json:"date_of_birth" db:"date_of_birth"`
	EnrollYear  time.Time `json:"enroll_year" db:"enroll_year"`
	Level       string    `json:"level" db:"level"`
}

type AuthStudent struct {
	StudentId int    `json:"StudentId" db:"student_id"`
	FirstName string `json:"first_name" db:"first_name"`
	Password  string `json:"password" db:"password"`
}
