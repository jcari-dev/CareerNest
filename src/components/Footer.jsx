import React from "react";
import { useTheme } from "@mui/material/styles";
import "../styles/Footer.css";

const messages = [
  "Remember to stay hydrated! 😊💧",
  "You're doing amazing, keep it up! 💪✨",
  "Believe in yourself and all that you are! 🌟💖",
  "Every day is a new beginning, embrace it! 🌅🌻",
  "You've got this! Keep pushing forward! 🚀🔥",
  "Success is the sum of small efforts, repeated daily! 🏆📈",
  "Stay positive, work hard, and make it happen! 💼💯",
  "Keep smiling, because life is a beautiful thing! 😊🌼",
  "You're capable of incredible things! 🌠💥",
  "Stay strong, you're stronger than you think! 🦾💪",
  "Every step forward is a step closer to your goals! 🛤️🚶‍♂️",
  "Take a deep breath; you're exactly where you need to be! 🌬️🧘‍♀️",
  "Embrace challenges—they make you stronger! 🧗‍♂️💪",
  "Keep learning, growing, and evolving! 📚🧠",
  "Good things take time, stay patient and keep going! ⏳💫",
  "Your hard work is inspiring! 🛠️🏅",
  "Be kind to yourself; you're doing the best you can! 💞🤗",
  "You have the power to create change! ⚡🌍",
  "Choose to be optimistic, it feels better! ☀️😊",
  "Small steps every day make a big difference! 🐢🏆",
  "Believe in the power of positive thinking! 💭💖",
  "You're stronger than any storm you face! 🌩️💪",
  "Celebrate your small victories! 🎉🥳",
  "Stay curious, keep learning! 🔍🧠",
  "Your potential is endless! 🚀💫",
  "Today is a fresh start, make the most of it! 🌅✨",
  "Keep your face towards the sunshine! 🌞🌻",
  "Progress is progress, no matter how small! 📈🌱",
  "Stay focused on your goals; you're closer than you think! 🎯🏁",
  "You are enough, just as you are! 🌼💖",
];

const Footer = () => {
  const theme = useTheme();
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <footer
      className="footer"
    >
      <span style={{ fontSize: "1.5em" }}>{randomMessage}</span>
      <span
        style={{
          position: "absolute",
          right: "16px",
        }}
      >
        BETA v0.4
      </span>
    </footer>
  );
};

export default React.memo(Footer);
