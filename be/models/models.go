package models

import "gorm.io/gorm"

type Expense struct {
	gorm.Model
	Id     uint    `json:"id" gorm:"primaryKey"`
	Title  string  `json:"title" gorm:"not null"`
	Amount float64 `json:"amount" gorm:"not null"`
	Date   string  `json:"date" gorm:"not null"`
	UserId uint    `json:"user_id" gorm:"not null"`
	User   User    `gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
type User struct {
	gorm.Model
	Id       uint      `json:"id" gorm:"primaryKey"`
	Email    string    `json:"email" gorm:"not null;unique"`
	Password []byte    `json:"-" gorm:"not null"`
	Expenses []Expense `json:"expenses"`
}
