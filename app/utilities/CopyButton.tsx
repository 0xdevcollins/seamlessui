import { CheckIcon, CopyIcon } from "@/public/icons/icons";
import { useEffect, useState } from "react";
import Button from "../ui/Button";

type Props = {
  copyText: string;
  buttonText?: string;
  className?: string;
  iconClassName?: string;
};

function CopyButton({
  copyText,
  buttonText,
  className,
  iconClassName = "",
}: Props) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => clearTimeout(id);
  }, [isCopied]);

  function handleFallbackCopy(text: string) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      const successful = document.execCommand("copy");
      setIsCopied(successful);
    } catch (error) {
      console.error("Fallback: Oops, unable to copy", error);
    }
    document.body.removeChild(textarea);
  }
  function handleCopyClick() {
    if (!copyText) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(copyText)
        .then(() => setIsCopied(true))
        .catch((err) => console.log(err));
    } else {
      handleFallbackCopy(copyText);
    }
  }
  return (
    <Button
      aria-label={isCopied ? "Copied!" : "copy"}
      aria-live="assertive"
      title={isCopied ? "Copied!" : "click to copy address"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleCopyClick();
      }}
      className={className}
      variant="ghost"
    >
      <span>{buttonText}</span>
      <span aria-hidden className={iconClassName}>
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </span>
    </Button>
  );
}

export default CopyButton;
