package controllers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/odeya2626/expenses/models"
)

type Expense struct {
	Title  string `json:"title"`
	Amount float64 `json:"amount"`
	Date   string `json:"date"`
	UserId uint `json:"user_id"`
	User   models.User `json:"user"`
}
func GetUserExpenses(c *fiber.Ctx) error {
	user_id, ok := c.Locals("userId").(uint)

	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	expenses := []models.Expense{}
	 if err := models.DB.Where("user_id = ?", user_id).Order("date DESC").Find(&expenses).Error; err != nil {
        return err
    }

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": expenses,})
}

func AddExpense(c *fiber.Ctx) error {
	user_id, ok := c.Locals("userId").(uint)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	data := Expense{}

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing JSON",
		})
	}
	expense := models.Expense{
		Title:  data.Title,
		Amount: data.Amount,
		Date:   data.Date,
		UserId: user_id,
	}
	if err := models.DB.Create(&expense).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error creating expense",
		})
	}
	createdExpense := models.Expense{}
	if err := models.DB.First(&createdExpense, expense.Id).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error retrieving expense",
		})
	}
	return c.Status(fiber.StatusCreated).JSON(createdExpense)

}

func UpdateExpense(c *fiber.Ctx) error {
	expense_id, err := strconv.Atoi(c.Params("expense_id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid expense ID",
		})
	}
	

	expense := models.Expense{}
	if err := models.DB.First(&expense, expense_id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Expense not found",
		})
	}
	user_id, ok := c.Locals("userId").(uint)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	if err := c.BodyParser(&expense); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error updating expense",
		})
	}
	expense.UserId = user_id
	expense.Id = uint(expense_id)
	
	if err:= models.DB.Save(&expense).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating expense",
		})

	}
	updatedExpense := models.Expense{}
	if err := models.DB.First(&updatedExpense, expense_id).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error retrieving expense",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": updatedExpense,
	})
}

func DeleteExpense(c *fiber.Ctx) error {
	expense_id, err := strconv.Atoi(c.Params("expense_id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid expense ID",
		})
	}
	expense := models.Expense{}
	if err := models.DB.First(&expense, expense_id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Expense not found",
		})
	}
	user_id, ok := c.Locals("userId").(uint)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	if user_id != expense.UserId {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	models.DB.Delete(&expense)
	return c.Status(fiber.StatusNoContent).JSON(fiber.Map{
		"message": "Expense deleted",
	})
}