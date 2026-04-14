import connectDB from "@/Lib/db.js";
import { HashPassword } from "@/Lib/hashPassword.js";
import Image from "next/image";

export default async function Home() {
  await connectDB();
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe aliquam
      consequatur nostrum optio accusantium ipsam ipsa animi perspiciatis iste,
      explicabo eligendi ad aperiam doloremque, quibusdam eveniet atque officia
      quisquam sint.
    </div>
  );
}
