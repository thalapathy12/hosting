const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const clientRoutes = require('./routes/clientRoutes');
const contactRoutes = require('./routes/contactRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const milestoneRoutes = require('./routes/milestoneRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');
const project = require('./models/project');



dotenv.config();
connectDB();


const app = express();
app.use(express.json());

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);

    // Allow only localhost with any port
    const allowed = /^http:\/\/localhost(:\d+)?$/.test(origin);

    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('CORS enabled for any localhost origin');
});


app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/payments',paymentRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/projects', projectRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.send('CRM API is running...');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler (optional expansion)
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});



module.exports = app;
