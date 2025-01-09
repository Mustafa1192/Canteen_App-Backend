// // // // ///////////////////////////////////// Complete Registration & Login Process /////////////////////////////////////////////////////////////
// // // // // Without TTL Index in Main User 
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto'); // To generate OTP
// const bcrypt = require('bcrypt'); // To hash passwords
// const Food = require('./models/Food.json');
// const razorpay = require('razorpay');
// const instance = new razorpay({
//   key_id: 'YOUR_KEY_ID',
//   key_secret: 'YOUR_KEY_SECRET',
// });

// instance.orders.create({ amount: 50000, currency: 'INR', receipt: 'order_rcptid_11' }, function (err, order) {
//   console.log(order);
// });


// const app = express();
// const PORT = 5000;
// const MONGODB_URI = 'mongodb+srv://mustafakhan31499:cNG8NPtbhNaY5ieh@cluster1.cye9d.mongodb.net/Canteen_app?retryWrites=true&w=majority&appName=Cluster1';

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected successfully 🚀'))
//   .catch((error) => console.error('Error connecting to MongoDB:', error)); 

// app.get('/api/foods', (req, res) =>{
//   return res.json(Food);
// })

// // Define Main User Schema (No TTL index)
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String }
// }, { collection: 'User', timestamps: true });

// const User = mongoose.model('User', userSchema);

// // Define TempUser Schema (For OTP verification)
// const tempUserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   otp: { type: String },
//   otpExpires: { type: Date }
// }, { collection: 'TempUser', timestamps: true });

// const TempUser = mongoose.model('TempUser', tempUserSchema);

// // Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'onemenu.it@gmail.com',
//     pass: 'euwo vymq gdxb jsmf'
//   }
// });

// // Route to handle OTP generation (Step 1)
// app.post('/send-otp', async (req, res) => {
//   const { username, email } = req.body;

//   try {
//     // Check if user already exists in Main User collection
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists!' });
//     }

//     // Check for existing TempUser
//     let tempUser = await TempUser.findOne({ email });

//     // Generate new OTP
//     const otp = crypto.randomInt(100000, 999999).toString();

//     if (tempUser) {
//       tempUser.otp = otp;
//       tempUser.otpExpires = Date.now() + 60000; // 1-minute expiry
//       await tempUser.save();
//     } else {
//       tempUser = new TempUser({ username, email, otp, otpExpires: Date.now() + 60000 });
//       await tempUser.save();
//     }

//     // Send OTP via email
//     const mailOptions = {
//       from: 'onemenu.it@gmail.com',
//       to: email,
//       subject: 'Your OTP for AIKTC OneMenu App – Verify Your Registration',
//       text: `Dear ${username},

// Thank you for signing up with **AIKTC OneMenu App**!

// To complete your registration and secure your account, please enter the One-Time Password (OTP) below within the next 60 seconds:

// **OTP:** ${otp}

// If you did not request this registration, please ignore this email. Your account will remain unaffected.

// For your security, do not share your OTP with anyone.

// If you face any issues or have questions, feel free to reach out to us at:  
// **onemenu.it@gmail.com**

// We’re here to assist you!

// Best regards,  
// **The AIKTC OneMenu App Team**

// ---

// **Note:** This is an automated email. Please do not reply to this message.`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).json({ message: 'Error sending OTP email!' });
//       }
//       res.status(200).json({ message: 'New OTP sent to your email!' });
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Route to verify OTP and complete registration (Step 2)
// app.post('/verify-otp', async (req, res) => {
//   const { email, otp, password } = req.body;

//   try {
//     // Find user in TempUser collection
//     const tempUser = await TempUser.findOne({ email, otp });

//     if (!tempUser) {
//       return res.status(400).json({ message: 'Invalid OTP!' });
//     }

//     if (Date.now() > tempUser.otpExpires) {
//       return res.status(400).json({ message: 'OTP has expired :) ' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Transfer user from TempUser to User collection
//     const newUser = new User({
//       username: tempUser.username,
//       email: tempUser.email,
//       password: hashedPassword
//     });

//     await newUser.save();

//     // Remove the user from TempUser collection
//     await TempUser.deleteOne({ email });

//     res.status(200).json({ message: 'Registration successful 👍' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error :)' });
//   }
// });

// // Route to handle Resend OTP
// app.post('/resend-otp', async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Find user in TempUser collection
//     const tempUser = await TempUser.findOne({ email });

//     if (!tempUser) {
//       return res.status(400).json({ message: 'User not found or already verified!' });
//     }

//     // Generate a new OTP
//     const newOtp = crypto.randomInt(100000, 999999).toString();
//     tempUser.otp = newOtp;
//     tempUser.otpExpires = Date.now() + 60000; // New expiry
//     await tempUser.save();

//     // Send OTP via email
//     const mailOptions = {
//       from: 'onemenu.it@gmail.com',
//       to: email,
//       subject: 'Your OTP for AIKTC OneMenu App – Verify Your Registration',
//       text: `Dear ${username},

// Thank you for signing up with **AIKTC OneMenu App**!

// To complete your registration and secure your account, please enter the One-Time Password (OTP) below within the next 60 seconds:

// **OTP:** ${otp}

// If you did not request this registration, please ignore this email. Your account will remain unaffected.

// For your security, do not share your OTP with anyone.

// If you face any issues or have questions, feel free to reach out to us at:  
// **onemenu.it@gmail.com**

// We’re here to assist you!

// Best regards,  
// **The AIKTC OneMenu App Team**

// ---

// **Note:** This is an automated email. Please do not reply to this message.`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).json({ message: 'Error sending OTP email!' });
//       }
//       res.status(200).json({ message: 'New OTP sent to your email!' });
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(400).json({ message: 'User not found!' });
//     }

//     // Compare the provided password with the hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid password!' });
//     }

//     res.status(200).json({ message: 'Login successful! 👍', user: user.username });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });
////////////////////////////////////////////////////////////Without entering password
// // app.post('/api/check-user', async (req, res) => {
// //   const { email } = req.body;

// //   try {
// //     // Check if the user exists in the main User collection
// //     const userExists = await User.exists({ email });

// //     if (userExists) {
// //       return res.status(200).json({ exists: true });
// //     }
// //     res.status(200).json({ exists: false });
// //   } catch (error) {
// //     res.status(500).json({ message: "Server error. Please try again later." });
// //   }
// // });



// ///////////////////////////////////////// Forgot Password Feature /////////////////////////////////////////////

// // Route to send OTP for password reset
// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Check if user exists in Main User collection
//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res.status(400).json({ message: 'User not found! Please register first.' });
//     }

//     // Generate a new OTP
//     const otp = crypto.randomInt(100000, 999999).toString();
//     const otpExpires = Date.now() + 60000; // 1-minute expiry

//     // Upsert TempUser with OTP
//     await TempUser.findOneAndUpdate(
//       { email },
//       { otp, otpExpires },
//       { upsert: true, new: true }
//     );

//     //Send OTP via email
//     const mailOptions = {
//       from: 'onemenu.it@gmail.com',
//       to: email,
//       subject: 'Reset Your Password - AIKTC OneMenu App',
//       text: `We received a request to reset the password for your AIKTC OneMenu App account.

// To proceed, use the One-Time Password (OTP) below within the next 60 seconds:

// OTP: ${otp}

// Important Notice: If you did not make this request, someone may be attempting to access your account. Please ignore this email, and no changes will be made to your account.

// For your security:
// - Do not share this OTP with anyone.
// - Only use this OTP on the official AIKTC OneMenu App portal.

// If you have concerns or did not request this reset, please contact our support team at onemenu.it@gmail.com.

// Best regards,  
// The AIKTC OneMenu App Team

// Note: This is an automated message. Replies to this email are not monitored.`,
//     };
    
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).json({ message: 'Error sending OTP!' });
//       }
//       res.status(200).json({ message: 'OTP sent to your email.' });
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Route to verify OTP and reset password
// app.post('/reset-password', async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     // Find the OTP in TempUser collection
//     const tempUser = await TempUser.findOne({ email, otp });

//     if (!tempUser) {
//       return res.status(400).json({ message: 'Invalid or expired OTP!' });
//     }

//     if (Date.now() > tempUser.otpExpires) {
//       return res.status(400).json({ message: 'OTP has expired!' });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password in the User collection
//     await User.findOneAndUpdate(
//       { email },
//       { password: hashedPassword }
//     );

//     // Remove the TempUser entry
//     await TempUser.deleteOne({ email });

//     res.status(200).json({ message: 'Password reset successful!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// // Start the server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









/////////////////////////////////////////////////////////// Working With Latest Reqiurements
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // To generate OTP
const bcrypt = require('bcrypt'); // To hash passwords

const app = express();
// const PORT = 5000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
    
// MongoDB Connection URI
const MONGODB_URI = 'mongodb+srv://mustafakhan31499:cNG8NPtbhNaY5ieh@cluster1.cye9d.mongodb.net/Canteen_app?retryWrites=true&w=majority&appName=Cluster1';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully 🚀'))
    .catch(error => console.error('MongoDB connection error:', error));

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }
}, { collection: 'User', timestamps: true });

const User = mongoose.model('User', userSchema);

// TempUser Schema and Model
const tempUserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpires: { type: Date }
}, { collection: 'TempUser', timestamps: true });

const TempUser = mongoose.model('TempUser', tempUserSchema);

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'onemenu.it@gmail.com',
        pass: 'euwo vymq gdxb jsmf' // Consider environment variables or secure vault for credentials
    }
});

// Route: Register New User After OTP Verification
app.post('/register', async (req, res) => {
  const { email, username, password, otp } = req.body;

  try {
      const tempUser = await TempUser.findOne({ email });

      if (!tempUser || tempUser.otp !== otp) {
          return res.status(400).json({ message: 'Invalid or expired OTP.' });
      }

      // Check if the username or email is already taken
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
          return res.status(400).json({ message: 'Email or username already in use.' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = new User({ email, username, password: hashedPassword });
      await newUser.save();

      // Cleanup TempUser record
      await TempUser.deleteOne({ email });

      res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error.' });
  }
});


// Helper: Generate OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Helper: Send Email
const sendEmail = (to, subject, text) => {
    return transporter.sendMail({
        from: 'onemenu.it@gmail.com',
        to,
        subject,
        text,
    });
};

// Route: Send OTP for Login/Registration
app.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const otp = generateOTP();
            await TempUser.findOneAndUpdate(
                { email },
                { otp, otpExpires: Date.now() + 60000 },
                { upsert: true, new: true }
            );

            await sendEmail(email, 'Your Login OTP', `Your OTP is: ${otp}`);
            return res.status(200).json({ message: 'OTP sent for login.' });
        }

        // If user doesn't exist, prompt to register
        res.status(404).json({ message: 'User not found. Redirecting to registration.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Route: Verify OTP
// Route: Verify OTP for Login
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
      // Find the temporary user record with the OTP
      const tempUser = await TempUser.findOne({ email });

      // Check if the user exists in TempUser and verify the OTP
      if (!tempUser) {
          return res.status(404).json({ message: 'No pending OTP request found.' });
      }

      // Check if OTP matches
      if (tempUser.otp !== otp) {
          return res.status(400).json({ message: 'Invalid OTP.' });
      }

      // Check if OTP is expired
      if (Date.now() > tempUser.otpExpires) {
          return res.status(400).json({ message: 'OTP has expired.' });
      }

      // OTP is valid, now find the user in the main User collection
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // If the user exists, you can proceed to logging them in.
      // For now, we'll send a success response as a simple way of completing the login
      res.status(200).json({ message: 'Login successful.' });

      // (Optional) Generate JWT token here if you use tokens for authentication.

      // Cleanup: Delete the temporary OTP entry after it's been used.
      await TempUser.deleteOne({ email });

  } catch (error) {
      console.error('Error during OTP verification:', error);
      res.status(500).json({ message: 'Server error during OTP verification.' });
  }
});


// Route: Resend OTP
app.post('/resend-otp', async (req, res) => {
    const { email } = req.body;

    try {
        const otp = generateOTP();
        await TempUser.findOneAndUpdate(
            { email },
            { otp, otpExpires: Date.now() + 60000 },
            { upsert: true, new: true }
        );

        await sendEmail(email, 'Your New OTP', `Your new OTP is: ${otp}`);
        res.status(200).json({ message: 'OTP resent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



