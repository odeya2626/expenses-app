package middlewares

import (
	"log"
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber"
	"github.com/joho/godotenv"
	"github.com/odeya2626/expenses/models"
)

func IsAuthenticated(c *fiber.Ctx) error {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	claims := token.Claims.(*jwt.StandardClaims)
	var user models.User
	models.DB.Where("id = ?", claims.Issuer).First(&user)
	c.Locals("userId", user.Id)
	c.Next()
	return nil
}
// userId := c.Locals("userId").(string)