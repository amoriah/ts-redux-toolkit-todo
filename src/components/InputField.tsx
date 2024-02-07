import React from 'react';

interface InputFieldProps {
  text: string;
  handleInput: (str: string) => void;
  handleSubmit: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  text,
  handleInput,
  handleSubmit,
}) => {
  return (
    <label>
      <input value={text} onChange={e => handleInput(e.target.value)} />
      <button onClick={handleSubmit}>add</button>
    </label>
  );
};
