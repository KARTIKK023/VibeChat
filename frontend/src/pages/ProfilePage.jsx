import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  }),
};

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <motion.div
      className="h-screen pt-10 bg-base-100 overflow-y-auto"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="max-w-2xl mx-auto p-4 py-8"
        variants={fadeInUp}
        custom={0}
      >
        <motion.div
          className="bg-base-300 rounded-xl p-6 space-y-8"
          variants={fadeInUp}
          custom={0.1}
        >
          {/* Header */}
          <motion.div
            className="text-center"
            variants={fadeInUp}
            custom={0.2}
          >
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </motion.div>

          {/* Avatar Upload */}
          <motion.div
            className="flex flex-col items-center gap-4"
            variants={fadeInUp}
            custom={0.3}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </motion.div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </motion.div>

          {/* User Info */}
          <motion.div className="space-y-6" variants={fadeInUp} custom={0.4}>
            <motion.div className="space-y-1.5" variants={fadeInUp} custom={0.45}>
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </motion.div>

            <motion.div className="space-y-1.5" variants={fadeInUp} custom={0.5}>
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </motion.div>
          </motion.div>

          {/* Account Information */}
          <motion.div className="mt-6 bg-base-300 rounded-xl p-6" variants={fadeInUp} custom={0.6}>
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <motion.div
                className="flex items-center justify-between py-2 border-b border-zinc-700"
                variants={fadeInUp}
                custom={0.65}
              >
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </motion.div>
              
              <motion.div
                className="flex items-center justify-between py-2"
                variants={fadeInUp}
                custom={0.7}
              >
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </motion.div>
              <motion.div
                className="flex items-center justify-between py-2 border-t border-zinc-700"
                variants={fadeInUp}
                custom={0.7}
              >
                <span>Delete Account</span>
                <button onclick className="text-red-500">Delete</button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
