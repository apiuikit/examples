export default function CodeBlock({ title, children }: { title?: string; children: string }) {
  return (
    <figure className="codeblock">
      {title && <figcaption>{title}</figcaption>}
      <pre>
        <code>{children.trim()}</code>
      </pre>
    </figure>
  );
}
