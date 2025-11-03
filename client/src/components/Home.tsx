import TicketButton from "./TicketButton";

export default function Home() {
  return (
    <div className="relative w-full h-screen  flex items-center justify-center overflow-hidden">
      {/* Fullscreen Image - Always fully visible */}
      <img
        src="../../public/FolkAkhyan.jpg" // Replace with your uploaded image path or Cloudinary link
        alt="The Folk Abhiyan"
        className="w-full h-full object-contain"
      />

      {/* Optional overlay for better contrast */}
      {/* <div className="absolute inset-0 bg-black/20"></div> */}

      {/* Centered Button */}
      <div className="absolute inset-10 flex items-center justify-center z-4">
        <TicketButton />
      </div>
    </div>
  );
}
