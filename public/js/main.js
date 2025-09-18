// Main JavaScript file for the food ordering application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize food ordering functionality
    initFoodOrdering();
    
    // Initialize admin functionality
    initAdminFeatures();
    
    // Initialize form validation
    initFormValidation();
});

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

// Food Ordering Functionality
function initFoodOrdering() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const foodId = this.dataset.foodId;
            const quantity = this.closest('.food-actions').querySelector('.quantity-input').value;
            
            if (quantity > 0) {
                addToCart(foodId, quantity);
            } else {
                showAlert('Vui lòng chọn số lượng', 'warning');
            }
        });
    });
    
    // Quantity controls
    quantityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            const currentValue = parseInt(input.value) || 0;
            
            if (this.classList.contains('quantity-plus')) {
                input.value = currentValue + 1;
            } else if (this.classList.contains('quantity-minus') && currentValue > 0) {
                input.value = currentValue - 1;
            }
        });
    });
    
    // Quantity input validation
    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
}

// Add item to cart
function addToCart(foodId, quantity) {
    // Show loading state
    const button = document.querySelector(`[data-food-id="${foodId}"]`);
    const originalText = button.textContent;
    button.textContent = 'Đang thêm...';
    button.disabled = true;
    
    // Simulate API call (in real app, this would be an actual API call)
    setTimeout(() => {
        showAlert(`Đã thêm ${quantity} món vào giỏ hàng!`, 'success');
        button.textContent = originalText;
        button.disabled = false;
        
        // Update cart count if element exists
        updateCartCount();
    }, 1000);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
    }
}

// Admin Features
function initAdminFeatures() {
    // Order status updates
    const statusButtons = document.querySelectorAll('.status-btn');
    statusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            const newStatus = this.dataset.status;
            
            if (confirm(`Bạn có chắc muốn cập nhật trạng thái đơn hàng #${orderId}?`)) {
                updateOrderStatus(orderId, newStatus);
            }
        });
    });
    
    // Food management
    const deleteFoodButtons = document.querySelectorAll('.delete-food');
    deleteFoodButtons.forEach(button => {
        button.addEventListener('click', function() {
            const foodId = this.dataset.foodId;
            const foodName = this.dataset.foodName;
            
            if (confirm(`Bạn có chắc muốn xóa món "${foodName}"?`)) {
                deleteFood(foodId);
            }
        });
    });
}

// Update order status
function updateOrderStatus(orderId, status) {
    // Show loading state
    const button = document.querySelector(`[data-order-id="${orderId}"]`);
    const originalText = button.textContent;
    button.textContent = 'Đang cập nhật...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showAlert(`Đã cập nhật trạng thái đơn hàng #${orderId}`, 'success');
        button.textContent = originalText;
        button.disabled = false;
        
        // Update status badge
        const statusBadge = document.querySelector(`[data-order-id="${orderId}"]`).closest('tr').querySelector('.status-badge');
        statusBadge.className = `status-badge status-${status}`;
        statusBadge.textContent = getStatusText(status);
    }, 1000);
}

// Delete food item
function deleteFood(foodId) {
    // Show loading state
    const button = document.querySelector(`[data-food-id="${foodId}"]`);
    const originalText = button.textContent;
    button.textContent = 'Đang xóa...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showAlert('Đã xóa món ăn thành công!', 'success');
        
        // Remove the row from table
        const row = button.closest('tr');
        row.style.opacity = '0';
        setTimeout(() => {
            row.remove();
        }, 300);
    }, 1000);
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
    
    // Real-time validation
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Validate form
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('.form-control[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';
    
    // Required validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'Trường này là bắt buộc';
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Email không hợp lệ';
        }
    }
    
    // Password validation
    if (type === 'password' && value && value.length < 6) {
        isValid = false;
        message = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    // Show/hide error message
    showFieldError(field, isValid, message);
    
    return isValid;
}

// Show field error
function showFieldError(field, isValid, message) {
    const existingError = field.parentElement.querySelector('.invalid-feedback');
    
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.toggle('is-invalid', !isValid);
    
    if (!isValid && message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }
}

// Utility Functions
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} fade-in`;
    alertDiv.innerHTML = `
        <i class="fas fa-${getAlertIcon(type)}"></i>
        ${message}
        <button type="button" class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add close button styles
    const style = document.createElement('style');
    style.textContent = `
        .alert {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .alert-close {
            position: absolute;
            right: 1rem;
            background: none;
            border: none;
            cursor: pointer;
            opacity: 0.7;
        }
        .alert-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Insert alert at the top of main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(alertDiv, mainContent.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentElement) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

function getAlertIcon(type) {
    const icons = {
        success: 'check-circle',
        danger: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getStatusText(status) {
    const statusTexts = {
        pending: 'Chờ xử lý',
        completed: 'Hoàn thành',
        cancelled: 'Đã hủy'
    };
    return statusTexts[status] || status;
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const foodCards = document.querySelectorAll('.food-card');
            
            foodCards.forEach(card => {
                const foodName = card.querySelector('.food-name').textContent.toLowerCase();
                const foodCategory = card.querySelector('.food-category').textContent.toLowerCase();
                
                if (foodName.includes(searchTerm) || foodCategory.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch);
