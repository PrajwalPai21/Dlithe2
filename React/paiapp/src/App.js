import { useState } from "react";

function Parent() {
  const [message] = useState("Hello Ho");

  return <Child message={message} />;
}

function Child({ message }) {
  return <p>{message}</p>;
}

export default Parent;
