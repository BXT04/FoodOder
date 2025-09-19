<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #5d4a47;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-container {
            display: flex;
            width: 800px;
            height: 500px;
            background-color: #e8e8e8;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .left-section {
            background-color: #c85a5a;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 28px;
            font-weight: bold;
        }

        .right-section {
            width: 50%;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
        }

        .language-selector {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 12px;
            color: #666;
        }

        .login-title {
            font-size: 32px;
            font-weight: bold;
            color: #333;
            margin-bottom: 40px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            color: #333;
            font-weight: 500;
            margin-bottom: 8px;
            font-size: 16px;
        }

        .form-group input {
            width: 100%;
            padding: 12px 0;
            border: none;
            border-bottom: 2px solid #333;
            background: transparent;
            font-size: 16px;
            outline: none;
            transition: border-color 0.3s;
        }

        .form-group input:focus {
            border-bottom-color: #c85a5a;
        }

        .login-button {
            width: 100%;
            background-color: #c85a5a;
            color: white;
            border: none;
            padding: 12px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 20px;
            transition: background-color 0.3s;
        }

        .login-button:hover {
            background-color: #b04545;
        }

        .register-link {
            text-align: center;
            margin-top: 15px;
            font-size: 12px;
            color: #666;
        }

        .register-link a {
            color: #666;
            text-decoration: none;
        }

        .register-link a:hover {
            text-decoration: underline;
        }

        .social-buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }

        .social-button {
            flex: 1;
            padding: 10px;
            border: none;
            cursor: pointer;
            font-size: 12px;
            color: white;
            transition: opacity 0.3s;
        }

        .google-button {
            background-color: #c85a5a;
        }

        .facebook-button {
            background-color: #c85a5a;
        }

        .social-button:hover {
            opacity: 0.8;
        }

        @media (max-width: 768px) {
            .login-container {
                width: 90%;
                height: auto;
                flex-direction: column;
            }

            .left-section {
                width: 100%;
                height: 150px;
            }

            .right-section {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="left-section">
            <div>Picture</div>
        </div>
        
        <div class="right-section">
            <div class="language-selector">Tiếng Việt (VN)</div>
            
            <h1 class="login-title">Đăng nhập</h1>
            
            <form>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email">
                </div>
                
                <div class="form-group">
                    <label for="password">Mật khẩu</label>
                    <input type="password" id="password" name="password">
                </div>
                
                <button type="submit" class="login-button">Đăng nhập</button>
                
                <div class="register-link">
                    Chưa có tài khoản từ trước ? <a href="#">Đăng ký tài khoản</a>
                </div>
                
                <div class="social-buttons">
                    <button type="button" class="social-button google-button">Sign in with Google</button>
                    <button type="button" class="social-button facebook-button">Sign in with Facebook</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
