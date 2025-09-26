"use client";

export default function Footer() {
  const handleCopy = () => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText("suim5748@gmail.com");
      alert("이메일이 복사되었습니다!");
    } else {
      alert("이 브라우저에서는 복사 기능을 지원하지 않습니다.\n직접 복사해 주세요.");
    }
  };
  return (
    <>
      <div className="top-0 bottom-0 text-[#FCF8F2] py-[25px] px-5 md:px-[55px] lg:px-[85px] sm:px-5 bg-[#0D1B11] flex justify-between">
        <div className="hidden md:block text-base">2025 PotoPorio</div>
        <div className="cursor-pointer hover:drop-shadow-[0_0_10px_white] " onClick={handleCopy} title="클릭하면 복사됩니다">
          suim5748@gmail.com
        </div>
        <a href="https://github.com/KImSuim" className="hover:drop-shadow-[0_0_10px_white]">
          Github
        </a>
      </div>
    </>
  );
}
