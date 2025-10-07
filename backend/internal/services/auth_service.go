package services

import (
	"errors"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("YOUR_ULTRA_SECURE_SECRET_KEY")

// users map: key เป็น lowercase เสมอ
var users = map[string]struct {
	Password string
	RoleName string
}{
	"admin":   {Password: "1234", RoleName: "Admin"},
	"user":    {Password: "1234", RoleName: "User"},
	"approve": {Password: "1234", RoleName: "Approve"},
}

// Authenticate ตรวจสอบผู้ใช้และสร้าง JWT Token
func Authenticate(email, password string) (string, string, string, error) {
	// แปลง email เป็น lowercase ก่อน lookup
	email = strings.ToLower(email)

	user, exists := users[email]
	if !exists || user.Password != password {
		return "", "", "", errors.New("authentication failed: invalid credentials")
	}

	claims := jwt.MapClaims{
		"email":     email,
		"role_name": user.RoleName,
		"exp":       time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", "", "", errors.New("failed to generate token")
	}

	return tokenString, user.RoleName, email, nil
}
