package models

import "time"

type Student struct {
	Id          int       `json:"id"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	Password    string    `json:"password"`
	DateOfBirth time.Time `json:"date_of_birth"`
	EnrollYear  time.Time `json:"enroll_year"`
	Level       string    `json:"level"`
}
