"use client"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react"
import { Session } from "next-auth";
import Image from "next/image";
import {parseFullName} from "parse-full-name";

const Header = ({session}: {session: Session | null}) => {
  const name = session?.user?.name || '';
  const {last:lastName} = parseFullName(name);
  return (
    <header className="bg-white">
      <div className="flex justify-between max-w-3xl mx-auto px-4 py-4">
        <Link href={'/'} className="inline-flex items-center gap-1">
          <FontAwesomeIcon className="h-8" icon={faMugHot} />
          <span className="mt-2">Buy me a coffee</span>
        </Link>
        <nav className="mt-2 flex gap-6 items-center">
          <Link href="/about">About</Link>
          <Link href="/about">FAQ</Link>
          <Link href="/about">Contact</Link>

          <div className="flex gap-4">
            {session && (
              <div className="">
                <Link
                  href={"/profile"}
                  className="flex items-center gap-2 bg-yellow-300 rounded-full p-1 pr-4"
                >
                  <Image
                    src={session.user?.image as string}
                    alt="avatar"
                    width="36" height="36"
                    className="rounded-full"
                  />
                  {lastName}
                </Link>
              </div>

            )}
            {!session && (
              <>
                <button
                  onClick={() => signIn()}
                  className="bg-gray-200 rounded-full px-4 py-2 ml-4"
                >
                  Login
                </button>
                <button
                  className="bg-yellow-300 rounded-full px-4 py-2"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
      
    </header>
  );
};

export default Header;