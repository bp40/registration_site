package db

import (
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB

func InitDb() {
	DB = sqlx.MustOpen("mysql", os.Getenv("DBURI"))

	err := DB.Ping()
	if err != nil {
		panic(err)
	}
}
