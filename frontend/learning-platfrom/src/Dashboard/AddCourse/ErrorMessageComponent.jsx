import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { CiWarning } from "react-icons/ci";

const ErrorMessageComponent = ({ errors, name }) => {
  return (
    <>
      <ErrorMessage
        errors={errors}
        name={name}
        render={(error) => {
          let messages = error.messages;
          console.log(messages);
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <div
                  key={type}
                  className="before:content-warning before:inline text-pink-300 flex items-center gap-1"
                >
                  <CiWarning className=" inline-block" /> 
                  <p>{message}</p>
                </div>
              ))
            : null;
        }}
      />
    </>
  );
};

export default ErrorMessageComponent;
