import TicketButton from "./TicketButton";
import img from "../assets/FolkAkhyan.jpg";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Fullscreen Image */}
      <img
        src={img} // Replace with your image path or Cloudinary link
        alt="The Folk Abhiyan"
        className="w-full h-full object-contain"
      />

      {/* Centered Button - moved slightly upward */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <TicketButton />
      </div>
    </div>
  );
}
