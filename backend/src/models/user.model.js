import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function() {
        // Password required only if no Google ID
       
        return !this.googleId;
      },
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    // New field for Google OAuth
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
      // Why sparse: Not all users will have Google ID
    },
  },
  { timestamps: true }
);


//Index for efficient Google ID lookups

userSchema.index({ googleId: 1 });

const User = mongoose.model("User", userSchema);

export default User;