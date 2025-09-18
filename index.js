const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const port = 8080

// Cấu hình Pug template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Middleware để parse JSON và URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Mock data cho demo
const mockData = {
  users: [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user1', password: 'user123', role: 'user' }
  ],
  foods: [
    { id: 1, name: 'Phở Bò', price: 50000, category: 'Món chính', image: '/images/pho-bo.jpg' },
    { id: 2, name: 'Bún Bò Huế', price: 45000, category: 'Món chính', image: '/images/bun-bo-hue.jpg' },
    { id: 3, name: 'Cơm Tấm', price: 35000, category: 'Món chính', image: '/images/com-tam.jpg' },
    { id: 4, name: 'Bánh Mì', price: 20000, category: 'Đồ ăn nhanh', image: '/images/banh-mi.jpg' },
    { id: 5, name: 'Chè Đậu Đỏ', price: 15000, category: 'Tráng miệng', image: '/images/che-dau-do.jpg' },
    { id: 6, name: 'Nước Cam', price: 12000, category: 'Đồ uống', image: '/images/nuoc-cam.jpg' }
  ],
  orders: [
    { id: 1, userId: 2, items: [{ foodId: 1, quantity: 2 }, { foodId: 6, quantity: 1 }], total: 112000, status: 'completed', date: '2024-01-15' },
    { id: 2, userId: 2, items: [{ foodId: 2, quantity: 1 }, { foodId: 4, quantity: 2 }], total: 85000, status: 'pending', date: '2024-01-16' }
  ]
}

// Middleware để kiểm tra authentication
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next()
  } else {
    return res.redirect('/login')
  }
}

const requireAdmin = (req, res, next) => {
  if (req.session && req.session.userId) {
    const user = mockData.users.find(u => u.id === req.session.userId)
    if (user && user.role === 'admin') {
      return next()
    }
  }
  return res.redirect('/login')
}

// Routes
app.get('/', (req, res) => {
  res.render('home', { 
    title: 'Trang chủ - Đặt món ăn online',
    foods: mockData.foods,
    user: req.session ? mockData.users.find(u => u.id === req.session.userId) : null
  })
})

app.get('/login', (req, res) => {
  res.render('login', { title: 'Đăng nhập' })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  const user = mockData.users.find(u => u.username === username && u.password === password)
  
  if (user) {
    req.session = req.session || {}
    req.session.userId = user.id
    res.redirect('/')
  } else {
    res.render('login', { 
      title: 'Đăng nhập',
      error: 'Tên đăng nhập hoặc mật khẩu không đúng'
    })
  }
})

app.get('/logout', (req, res) => {
  req.session = null
  res.redirect('/')
})

app.get('/admin', requireAdmin, (req, res) => {
  const totalOrders = mockData.orders.length
  const totalRevenue = mockData.orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = mockData.orders.filter(order => order.status === 'pending').length
  const completedOrders = mockData.orders.filter(order => order.status === 'completed').length
  
  res.render('admin/dashboard', {
    title: 'Admin Dashboard',
    stats: {
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders
    },
    recentOrders: mockData.orders.slice(-5),
    foods: mockData.foods
  })
})

app.get('/admin/foods', requireAdmin, (req, res) => {
  res.render('admin/foods', {
    title: 'Quản lý món ăn',
    foods: mockData.foods
  })
})

app.get('/admin/orders', requireAdmin, (req, res) => {
  res.render('admin/orders', {
    title: 'Quản lý đơn hàng',
    orders: mockData.orders
  })
})

// API Routes
app.get('/api/foods', (req, res) => {
  res.json(mockData.foods)
})

app.get('/api/orders', requireAuth, (req, res) => {
  const userOrders = mockData.orders.filter(order => order.userId === req.session.userId)
  res.json(userOrders)
})

app.post('/api/orders', requireAuth, (req, res) => {
  const { items } = req.body
  const total = items.reduce((sum, item) => {
    const food = mockData.foods.find(f => f.id === item.foodId)
    return sum + (food.price * item.quantity)
  }, 0)
  
  const newOrder = {
    id: mockData.orders.length + 1,
    userId: req.session.userId,
    items,
    total,
    status: 'pending',
    date: new Date().toISOString().split('T')[0]
  }
  
  mockData.orders.push(newOrder)
  res.json({ success: true, order: newOrder })
})

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`)
})
