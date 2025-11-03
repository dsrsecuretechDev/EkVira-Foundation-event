function Navbar() {
  return (
    <>
      <header className="w-full bg-[#2E005C] text-white flex items-center justify-center py-3 shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src="https://www.ekvirafoundation.com/assets/uploads/media-uploader/untitled-design511664781473.png"
            alt="EkVira Foundation Logo"
            className="h-6 w-6"
          />
          <h1 className="text-lg font-semibold">EkVira Foundation</h1>
        </div>
      </header>
    </>
  );
}

export default Navbar;
