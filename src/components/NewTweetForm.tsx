import { useSession } from "next-auth/react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;

  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

export default function NewTweetForm() {
  const session = useSession();

  if (session.status !== "authenticated") return null;

  return <Form />;
}

function Form() {
  const session = useSession();

  const [inputValue, setInputValue] = useState("");
  const textAreaReference = useRef<HTMLTextAreaElement>();

  const inputReference = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaReference.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaReference.current);
  }, [inputValue]);

  if (session.status !== "authenticated") return null;

  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
          ref={inputReference}
          style={{ height: 0 }}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's new?"
        />
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  );
}
