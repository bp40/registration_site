package models

type AuthRegistrar struct {
	Registrar_id int    `json:"registrar_id" db:"registrar_id"`
	Password     string `json:"password" db:"password"`
}
