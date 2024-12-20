const express = require('express');
module.exports.handler = serverless(app);
const cors = require('cors');
const taskRoutes = require('./routes/TaskR'); // Assuming you have task routes set up
const projectRoutes = require('./routes/projectRoutes');
const roleRouter = require('./routes/rolesRotes');
const authRoutese = require('./routes/signInrought');
const kanbanRoutes = require('./controller/kanbanController');
const statusRoutes =  require('./routes/statusRoutes');
const userRoutes = require('./routes/usersRoutes');

// Assuming you have user ro/tes set up
const app = express();

// Middleware
app.use(express.json()); // Body parser middleware for JSON
app.use(cors()); // Cross-Origin Resource Sharing middleware

const mongoose = require('mongoose');

//


mongoose.connect('mongodb+srv://maheshofficial06613:N9WEY1eW6a3avEG9@dashboard.1gs3c.mongodb.net/?retryWrites=true&w=majority&appName=dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
// Use Routes
 // Route for users
//  app.use('/api/tasks', taskRoutes);// Route for tasks
app.use('/api/projects', projectRoutes); // Route for projects
app.use('/api', authRoutese);
app.use('/api',kanbanRoutes);
app.use('/api/status', statusRoutes);
app.use('/api', roleRouter);
app.use('/api/users', userRoutes);
app.use('/api', kanbanRoutes);
app.use("/api/tasks", taskRoutes);
// Start Server
app.listen(4000, () => console.log('Server running on http://localhost:4000'));
