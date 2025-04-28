import Link from "next/link";
import { Guestbook } from "./types/guestbook";
import GuestbookLayout from "./layout";
import Header from "./components/Header";
import Content from "./components/Content";
import Card from "./components/Card";
interface GuestbookCardProps {
  guestbook: Guestbook[];
}

export default function GuestbookCard({ guestbook }: GuestbookCardProps) {
  return (
    <GuestbookLayout>
      {guestbook.map((guestbook) => (
        <Link href={`/${guestbook.id}`}>
          <Card>
            <Header author={guestbook.author} createdAt={guestbook.createdAt} />
            <Content content={guestbook.content} />
          </Card>
        </Link>
      ))}
    </GuestbookLayout>
  );
}
