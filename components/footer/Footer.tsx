"use client";

export default function Footer() {
  const handleCopy = () => {
    navigator.clipboard.writeText("suim5748@gmail.com");
    alert("이메일이 복사되었습니다!");
  };
  return (
    <>
      <div className="top-0 bottom-0 text-[#FCF8F2] py-[25px] px-[85px]  bg-[#0D1B11] flex justify-between">
        <div>2025 PotoPorio</div>
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
