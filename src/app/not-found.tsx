import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center text-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/assets/images/not-found/not-found.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="relative z-20 text-white">
        {/* <h1 className="text-5xl font-bold">404</h1>
        <p className="text-xl mt-4">Trang bạn tìm kiếm không tồn tại.</p> */}
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
}
