"use client";
import katex from "katex";
import React from "react";

interface MathParagraphProps {
  children: string;
}

const MathParagraph: React.FC<MathParagraphProps> = ({ children }) => {
  // Detect $$...$$ for block and $...$ for inline (without $$)
  const regex = /\$\$(.+?)\$\$|\$(?!\$)(.+?)(?<!\$)\$/gs;

  const parts: (string | { math: string; block: boolean })[] = [];
  let lastIndex = 0;

  for (const match of children.matchAll(regex)) {
    const [full, blockMath, inlineMath] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push(children.slice(lastIndex, index));
    }

    if (blockMath) {
      parts.push({ math: blockMath.trim(), block: true });
    } else if (inlineMath) {
      parts.push({ math: inlineMath.trim(), block: false });
    }

    lastIndex = index + full.length;
  }

  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }

  return (
    <span>
      {parts.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        const html = katex.renderToString(part.math, {
          throwOnError: false,
          displayMode: part.block,
        });
        return (
          <span
            key={i}
            dangerouslySetInnerHTML={{ __html: html }}
            className={part.block ? "block my-3 text-center" : ""}
          />
        );
      })}
    </span>
  );
};

export default MathParagraph;
