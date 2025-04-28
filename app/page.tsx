import GuestbookCard from "@/components/Guestbook";
import Heading from "@/components/Common/bases/Typography/Heading";

export default function Home() {
  return (
    <>
      <Heading>방명록</Heading>
      <GuestbookCard guestbook={[]} />
    </>
  );
}
