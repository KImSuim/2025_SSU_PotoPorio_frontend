"use client";

export default function AboutMe() {
  return (
    <>
      <div className="text-[#FCF8F2] text-2xl z-20 relative px-[200px] pt-[80px] pb-[350px] bg-[#2E5D3A] flex flex-col gap-[20px]">
        <div className="max-w-9xl text-left mx-auto ">
          <div className="text-[80px]">About me</div>
          <div className="font-aboutme font-pretendard text-[55px] mt-[10px]">"디자인과 사용자 경험을 연결하는 개발자"</div>
          <div className="font-subtitle font-pretendard text-[35px] flex flex-col gap-6 mt-[30px]">
            <div>
              안녕하세요 웹 프론트엔드 개발자를 꿈꾸는 김수임입니다. <br />
              컴퓨터공학 전공과 SEO·마케팅 경험을 바탕으로, 웹을 다양한 시각에서 바라보는 개발자입니다. 현재는 프론트엔드 분야에 집중하며 실력을 쌓아가고 있습니다.
            </div>
            <div>디자인과 사용자 경험에 관심이 많으며, Figma를 활용해 시각적 완성도 높은 UI를 구현할 수 있습니다. 보기 좋고 쓰기 편한 웹을 만드는 것이 저의 목표입니다.</div>
            <div>소통과 협업을 중요하게 생각하며, 함께 성장하는 개발자가 되고자 합니다."</div>
          </div>
        </div>
      </div>
    </>
  );
}
