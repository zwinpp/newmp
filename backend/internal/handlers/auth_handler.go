package handlers

import (
	"github.com/gin-gonic/gin"
	"mantest/backend/internal/models"
	"mantest/backend/internal/services"
	"net/http"
	"fmt"
)

func LoginHandler(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	token, roleName, email, err := services.Authenticate(req.Email, req.Password)
	if err != nil {
		fmt.Println("DEBUG >>", req.Email, "req.Password:", req.Password)
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Authentication Fail: Please check user or Password"})
		return
	}

	c.JSON(http.StatusOK, models.AuthResponse{
		Token: token,
		Role:  roleName,
		Email: email,
	})
}
