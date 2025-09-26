"use client";

export default function AboutMe() {
  return (
    <>
      {/* <div className="top-0 bottom-0 text-[#FCF8F2] py-[25px] px-5 md:px-[55px] lg:px-[200px] sm:px-5 bg-[#0D1B11] flex justify-between"> */}
      <div className="text-[#FCF8F2] text-2xl z-20 relative px-8 sm:px-10 md:px-[100px] lg:px-[200px] pt-[40px] sm:pt-[80px] pb-[90px] lg:pb-[350px] bg-[#2E5D3A] flex flex-col gap-[20px]">
        <div className="max-w-9xl text-left mx-auto ">
          <div className="text-[48px] sm:text-[60px] md:text-[65px] lg:text-[80px]">About me</div>
          <div className="font-aboutme font-pretendard text-[25px] sm:text-[38px] md:text-[45px] lg:text-[55px] mt-[15px]">"디자인과 사용자 경험을 연결하는 개발자"</div>
          <div className="font-subtitle font-pretendard text-[19px] sm:text-[28px] md:text-[35px] lg:text-[35px] font-bold flex flex-col gap-3 mt-[20px] leading-7 sm:leading-10.5 md:leading-13">
            <div>저는 현재 컴퓨터공학 전공과 SEO·마케팅 경험을 바탕으로 웹 프론트엔드 개발자를 꿈꾸는 김수임 입니다.</div>
            <div>
              현재는 프론트엔드 분야에 집중하며 실력을 쌓아가고 있습니다. <br />
              디자인과 사용자 경험에 관심이 많으며, Figma를 활용해 시각적으로 완성도 높은 UI를 구현할 수 있습니다.
            </div>
            <div>
              저의 목표는 가독성이 좋고 쓰기 편한 웹을 만드는 것입니다. <br /> 목표를 이루는 과정 속에서 소통과 협업을 중요하게 생각하며 함께 성장할 때 성취감을 느낍니다.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
